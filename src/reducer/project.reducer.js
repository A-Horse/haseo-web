// @flow
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';
import { transformProject } from '../util/project-helpers';

export function projects(state: Map<string, *> = Map({ items: Map() }), action: FSAction) {
  switch (action.type) {
    case Actions.WS_GET_PROJECTS.SUCCESS:
      const items: { [string]: Project } = action.payload.reduce((result, item): {
        [string]: Project
      } => {
        result[item.name] = transformProject(item);
        return result;
      }, {});
      return state.set('items', fromJS(items));

    case Actions.WS_PROJECT_UPDATE.SUCCESS:
      return state.updateIn(['items', action.payload.name], () =>
        fromJS(transformProject(action.payload))
      );

    case Actions.WS_GET_PROJECT_INFOMATION.SUCCESS:
      return state.updateIn(['items', action.payload.name], () =>
        fromJS(transformProject(action.payload))
      );

    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS:
      console.log(action);
      return state;

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
