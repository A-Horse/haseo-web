// @flow
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';
import { transformFlowDescriptionMap } from '../util/project-helpers';

export function project(
  state: Map<{ projects: Project[] }> = Map({ projects: List() }),
  action: FSAction
) {
  switch (action.type) {
    case Actions.WS_GET_PROJECT.SUCCESS: {
      const projectBase: ProjectBase = action.payload;
      const flows: Flow[] = projectBase.flows.map(transformFlowDescriptionMap);

      const projectKey: number = state
        .get('projects')
        .findKey((project: Map<Project>): boolean => project.get('name') === projectBase.name);

      const project: Project = {
        name: projectBase.name,
        flows
      };

      return state.update(
        'projects',
        (projects: List<Project>) => (projectKey > -1 ? projects : projects.push(fromJS(project)))
      );
    }

    case Actions.WS_GET_PROJECTS.SUCCESS: {
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
    }

    default:
      return state;
  }
}
