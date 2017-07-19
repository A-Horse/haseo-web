import Actions from '../action/actions';
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';

function projects(state = Map({ items: List() }), action) {
  switch (action.type) {
    case Actions.GET_PROJECTS.SUCCESS:
      const items = action.playload.map(item => {
        return {
          ...item,
          flows: item.flows.map(flow => {
            const [flowName, flowCommand] = R.flatten([
              R.keys(flow),
              R.values(flow)
            ]);

            return {
              name: flowName,
              isRunning: item.status.isRunning
                ? item.status.currentFlowName === flowName
                : false,
              isSuccess: item.status.successedFlow.indexOf(flowName) >= 0,
              isFailure: item.status.flowErrorName === flowName
            };
          })
        };
      });

      return state.set('items', fromJS(items));
      break;
    default:
      return state;
  }
}

export default projects;
