// @flow
import { Map, List, fromJS } from 'immutable';
import R from 'ramda';
import Actions from '../action/actions';
import {
  generateFlowStatesToProject,
  transformFlowDescriptionMap,
  makeFlowStatesByProjectAndReport
} from '../util/project-helpers';

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

    case Actions.WS_TASK_PROJECT_FLOW_UNIT_UPDATE.SUCCESS: {
      const payload: {
        project: { name: string },
        flowResult: {
          status: FlowStatus,
          flowName: string,
          result: FlowOutputUnit[]
        }
      } =
        action.payload;

      const projectKey: number = state
        .get('projects')
        .findKey((project: Map<Project>): boolean => project.get('name') === payload.project.name);

      const flowKey: number = state
        .getIn(['projects', projectKey, 'flows'])
        .findKey((flow: Map<Flow>) => flow.get('name') === payload.flowResult.flowName);

      if (!(projectKey > -1)) {
        return state;
      }

      return state.updateIn(['projects', projectKey], (project: Map<Project>): Map<Project> =>
        project
          .update('status', (): ProjectStatus => payload.project.status)
          .update('flows', (flows: List<Flow>): List<Flow> =>
            flows.map((flow: Map<Flow>, index: number): Map<Flow> =>
              flow.update('status', () => {
                if (index < flowKey) {
                  return 'SUCCESS';
                }
                if (index === flowKey) {
                  return payload.flowResult.status;
                }
                if (
                  index === flowKey + 1 &&
                  payload.project.status !== 'SUCCESS' &&
                  payload.project.status !== 'FAILURE' &&
                  payload.flowResult.status !== 'FAILURE'
                ) {
                  return 'RUNNING';
                }
                return 'INITAL';
              })
            )
          )
      );
    }

    default:
      return state;
  }
}
