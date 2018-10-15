// @flow
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';
import { transformFlowDescriptionMap } from '../util/project-helpers';

export function detail(state: Map<string, *> = Map({ reports: List() }), action: FSAction) {
  switch (action.type) {
    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS: {
      const reports: ProjectReport = action.payload.map(report => ({
        ...report,
        flows: (report.flows || []).map(flow => transformFlowDescriptionMap(flow))
      }));

      return state.set('reports', fromJS(reports));
    }

    default:
      return state;
  }
}
