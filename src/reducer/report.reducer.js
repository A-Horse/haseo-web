// @flow
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';

export function report(
  state: Map<string, *> = Map({ reportGroupByProject: {} }),
  action: FSAction
) {
  switch (action.type) {
    case Actions.WS_GET_PROJECT_LAST_REPORT.SUCCESS: {
      const report: ProjectReport = action.payload;

      // put it epic
      if (!report) {
        return state;
      }

      /* const projectKey: number = state
       *   .get('projects')
       *   .findKey((project: Map<Project>): boolean => project.get('name') === report.projectName);
         
       * if (!(projectKey > -1)) {
       *   return state;
       * }*/
      /* const isRunningReport = report.status !== 'SUCCESS' && report.status !== 'FAILURE';*/

      /* let toUpdateState = state;*/

      /* if (!state.get('reportGroupByProject').has(report.projectName)) {
       *   toUpdateState.setIn(
       *     ['reportGroupByProject', report.projectName],
       *     fromJS({
       *       runningReports: [],
       *       completedReports: []
       *     })
       *   );
       * }
       */
      return state.updateIn(
        ['reportGroupByProject', report.projectName],
        (list: List<ProjectReport>) => {
          if (!list) {
            return List([fromJS(report)]);
          }
          return list.update(
            list.findKey(
              (report: Map<ProjectReport>) => report.get('projectName') === report.projectName
            ),
            fromJS(report)
          );
        }
      );

      return state.updateIn(['projects', projectKey], (project: Map<Project>) =>
        project
          .update('status', () => report.status)
          .update('flows', (flows: List<Flow>) =>
            flows.map((flow: Map<Flow>, index: number) =>
              flow.update(
                'status',
                (status: string) =>
                  index < (report.result && report.result.length)
                    ? report.result[index].status
                    : status
              )
            )
          )
      );
    }
    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS:
      console.log(action);
      return state;

    case Actions.WS_GET_PROJECT_REPORT.SUCCESS:
      return state;
    default:
      return state;
  }
}
