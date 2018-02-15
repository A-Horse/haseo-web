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
        return {
          name: project.name,
          status: 'INITAL',
          flows
        };
      });
      return state.set('projects', fromJS(projects));

    case Actions.WS_GET_PROJECT_LAST_REPORT.SUCCESS:
      /* const report*/
      const report: ProjectReport = action.payload;
      if (!report) {
        return state;
      }

      const projectKey: number = state
        .get('projects')
        .findKey((project: Map<Project>): boolean => project.get('name') === report.projectName);

      if (R.empty(projectKey)) {
        return state;
      }

      return state.updateIn(['projects', projectKey], (project: Map<Project>) =>
        project
          .update('projectStatus', () => report.status)
          .update('flows', (flows: List<Flow>) =>
            flows.map((flow: Map<Flow>, index: number) =>
              flow.update(
                'status',
                (status: string) =>
                  index < report.result.length ? report.result[index].status : status
              )
            )
          )
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
