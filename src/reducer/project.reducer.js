// @flow
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';
import {
  generateFlowStatesToProject,
  makeFlowStatesByProjectAndReport
} from '../util/project-helpers';

export function projects(state: Map<string, *> = Map({ projects: List() }), action: FSAction) {
  switch (action.type) {
    case Actions.WS_GET_PROJECTS.SUCCESS:
      const projects: Array<ProjectBase> = action.payload;
      console.log(projects);
      /* const items: { [string]: ProjectWithFlowStates } = action.payload.reduce((result, item): {
       *   [string]: ProjectWithFlowStates
       * } => {
       *   result[item.name] = item;
       *   return result;
       * }, {});*/
      return state.set('projects', fromJS(action.payload));

    case Actions.WS_GET_PROJECT_LAST_REPORT.SUCCESS:
      /* const report*/
      return state;

    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS:
      return state;

    case Actions.WS_GET_PROJECT_REPORT.SUCCESS:
      console.log(generateFlowStatesToProject(action.payload));
      return state;

    default:
      return state;
  }
}
