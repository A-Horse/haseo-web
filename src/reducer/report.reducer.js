// @flow
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';

export function report(state: Map<string, *> = Map({}), action: FSAction) {
  switch (action.type) {
    case Actions.WS_GET_PROJECT_LAST_REPORT.SUCCESS: {
      const report: ProjectReport = action.payload;

      if (!report) {
        return state;
      }

      return state.updateIn([report.projectName], (list: List<ProjectReport>) => {
        if (!list) {
          return List([fromJS(report)]);
        }
        return list.update(
          list.findKey(
            (report: Map<ProjectReport>) => report.get('projectName') === report.projectName
          ),
          fromJS(report)
        );
      });
    }
    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS:
      return state;

    case Actions.WS_GET_PROJECT_REPORT.SUCCESS:
      return state;
    default:
      return state;
  }
}
