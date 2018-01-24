// @flow
import Actions from '../action/actions';
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';

function transformProject(project: ProjectData): Project {
  const flowsNameSeq = [];
  return {
    ...project,
    flowStates: project.flows.map(flow => {
      const [flowName, flowCommand] = R.flatten([R.keys(flow), R.values(flow)]);
      flowsNameSeq.push(flowName);

      const isRunning = project.status.isRunning
        ? project.status.currentFlowName === flowName
        : false;

      const isWaitting =
        (project.status.isWaitting && !project.report.startDate) || // 在进行中的状态
        (!isRunning &&
          flowsNameSeq.indexOf(project.status.currentFlowName) < flowsNameSeq.indexOf(flowName) &&
          flowsNameSeq.indexOf(project.status.currentFlowName) > -1) || // 进行完了之后状态
        flowsNameSeq.indexOf(flowName) > flowsNameSeq.indexOf(project.report.flowErrorName); // 错误 flow 之后

      const isSuccess = isRunning
        ? false
        : project.report.flowErrorName !== flowName &&
          (flowsNameSeq.indexOf(project.report.flowErrorName) < 0
            ? true
            : flowsNameSeq.indexOf(project.report.flowErrorName) >= flowsNameSeq.indexOf(flowName));

      const status = isRunning
        ? 'RUNNING'
        : isWaitting ? 'WAITTING' : isSuccess ? 'SUCCESS' : 'FAILURE';

      return {
        name: flowName,
        status: status
      };
    })
  };
}

export function projects(state: Map<string, *> = Map({ items: Map() }), action: any) {
  switch (action.type) {
    case Actions.WS_GET_PROJECTS.SUCCESS:
      const items = action.payload.reduce((result, item) => {
        result[item.name] = transformProject(item);
        return result;
      }, {});
      return state.set('items', fromJS(items));

    case Actions.WS_PROJECT_UPDATE.SUCCESS:
      return state.updateIn(['items', action.payload.name], () =>
        fromJS(transformProject(action.payload))
      );

    case Actions.WS_GET_PROJECT_DETAIL.SUCCESS:
      return state.updateIn(['items', action.payload.name], () =>
        fromJS(transformProject(action.payload))
      );

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

    case Actions.WS_GET_PROJECT_REPORT.SUCCESS:
      console.log(action);
      console.log(transformProject(action.payload));
      return state;

    default:
      return state;
  }
}
