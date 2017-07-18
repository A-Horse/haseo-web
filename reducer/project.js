import Actions from '../action/actions';
import R from 'ramda';

function projects(
  state = {
    items: []
  },
  action
) {
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
              name: flowName
            };
          })
        };
      });
      return {
        ...state,
        items
      };
      break;
    default:
      return state;
  }
}

export default projects;
