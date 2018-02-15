// @flow
import { Map, List, fromJS } from 'immutable';
import R from 'ramda';
import Actions from '../action/actions';
import {
  generateFlowStatesToProject,
  transformFlowDescriptionMap,
  makeFlowStatesByProjectAndReport
} from '../util/project-helpers';

export function projects(
  state: Map<{ projects: Project[] }> = Map({ projects: List() }),
  action: FSAction
) {
  switch (action.type) {
    case Actions.WS_GET_PROJECTS.SUCCESS:
      const projectBases: ProjectBase[] = action.payload;
      const projects: Project[] = projectBases.map((project: ProjectBase): Project => {
        const flows: Flow[] = project.flows.map(transformFlowDescriptionMap);
        const status: ProjectStatus = 'INITAL';
        return {
          name: project.name,
          flows,
          status
        };
      });
      return state.set('projects', fromJS(projects));

    case Actions.WS_GET_PROJECT_LAST_REPORT.SUCCESS:
      /* const report*/
      const report: ProjectReport = action.payload;
      if (!report) {
        return state;
      }
      const projectKey = state
        .get('projects')
        .findKey((project: Map<Project>): boolean => project.get('name') === report.projectName);

      const projectStatus: ProjectStatus = !report.result ? 'RUNNING' : 'INITAL';

      return state.updateIn(['projects', projectKey], (project: Map<Project>) =>
        project.update('projectStatus', () => projectStatus)
      );

    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS:
      return state;

    case Actions.WS_GET_PROJECT_REPORT.SUCCESS:
      console.log(generateFlowStatesToProject(action.payload));
      return state;

    default:
      return state;
  }
}
