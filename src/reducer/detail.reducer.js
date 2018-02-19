// @flow
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';
import Actions from '../action/actions';

export function detail(state: Map<string, *> = Map({ reports: List() }), action: FSAction) {
  switch (action.type) {
    case Actions.WS_GET_PROJECT_REPORT_HISTORY.SUCCESS: {
      const reports: ProjectReport = action.payload;
      return state.set('reports', fromJS(reports));
    }

    default:
      return state;
  }
}
