import Actions from '../action/actions';
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';

function transformProject(project) {
  return {
    ...project,
    flows: project.flows.map(flow => {
      const [flowName, flowCommand] = R.flatten([R.keys(flow), R.values(flow)]);
      return {
        name: flowName,
        isRunning: project.status.isRunning ? project.status.currentFlowName === flowName : false,
        isSuccess: project.status.successedFlow.indexOf(flowName) >= 0,
        isFailure: project.status.flowErrorName === flowName
      };
    })
  };
}

export function projects(state = Map({ items: List() }), action) {
  switch (action.type) {
    case Actions.GET_PROJECTS.SUCCESS:
      const items = action.playload.reduce((result, item) => {
        result[item.name] = transformProject(item);
        return result;
      }, {});
      return state.set('items', fromJS(items));
      break;
    case Actions.RECEIVED_PROJECT.SUCCESS:
      return state.updateIn(['items', action.playload.name], () =>
        fromJS(transformProject(action.playload))
      );
      break;
    default:
      return state;
  }
}
