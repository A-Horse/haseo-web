import Actions from '../action/actions';
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';

function transformProject(project) {
  const flowsNameSeq = [];
  console.log(project);
  return {
    ...project,
    flowState: project.flows.map(flow => {
      const [flowName, flowCommand] = R.flatten([R.keys(flow), R.values(flow)]);
      flowsNameSeq.push(flowName);

      const isRunning = project.status.isRunning
        ? project.status.currentFlowName === flowName
        : false;
      const isWaitting =
        (project.status.isWaitting && !project.currentReport.startDate) || // 在进行中的状态
        (!isRunning &&
          flowsNameSeq.indexOf(project.status.currentFlowName) < flowsNameSeq.indexOf(flowName) &&
          flowsNameSeq.indexOf(project.status.currentFlowName) > -1) || // 在进行中的状态
        (flowsNameSeq.indexOf(flowName) > flowsNameSeq.indexOf(project.currentReport.flowErrorName) > 0 &&
          flowsNameSeq.indexOf(project.currentReport.flowErrorName) > -1); // 如果是完成的状态，用 flowErrorName 来判断

      return {
        name: flowName,
        isRunning,
        isWaitting,
        isSuccess: isRunning
          ? false
          : project.currentReport.flowErrorName !== flowName &&
            // flowsNameSeq.indexOf(flowName) >= 0 &&
            // flowsNameSeq.indexOf(project.status.currentFlowName) <= 0 &&
            (flowsNameSeq.indexOf(project.currentReport.flowErrorName) < 0
              ? true
              : flowsNameSeq.indexOf(project.currentReport.flowErrorName) >=
                flowsNameSeq.indexOf(flowName))
      };
    })
  };
}

export function projects(state = Map({ items: Map() }), action) {
  switch (action.type) {
    case Actions.WS_GET_PROJECTS.SUCCESS:
      const items = action.payload.reduce((result, item) => {
        result[item.name] = transformProject(item);
        return result;
      }, {});
      return state.set('items', fromJS(items));
      break;

    case Actions.WS_PROJECT_UPDATE.SUCCESS:
      return state.updateIn(['items', action.payload.name], () =>
        fromJS(transformProject(action.payload))
      );
      break;

    case Actions.WS_GET_PROJECT_DETAIL.SUCCESS:
      console.log('action', action);
      return state.updateIn(['items', action.payload.name], () =>
        fromJS(transformProject(action.payload))
      );
      break;

    // TODO 这个要改的
    case Actions.WS_PROJECT_UNIT_FRAGMENT_UPDATE.SUCCESS:
      return state.updateIn(
        ['items', action.payload.name, 'status', 'flowsOutput'],
        flowsOutput => {
          if ((flowsOutput.last() || Map({})).get('flowName') === action.payload.flowName) {
            return flowsOutput.set(
              -1,
              flowsOutput
                .last()
                .update('output', fragments => fragments.push(action.payload.fragment))
            );
          }
          return flowsOutput.push(
            Map({ flowName: action.payload.flowName, output: List([action.payload.fragment]) })
          );
        }
      );
      break;

    case Actions.WS_GET_PROJECT_REPORT.SUCCESS:

      return state;
      break;

    default:
      return state;
  }
}
