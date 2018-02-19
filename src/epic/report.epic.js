// @flow
import Actions from '../action/actions';
import { Observable } from 'rxjs/Observable';
import { Map, List, fromJS } from 'immutable';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/ignoreElements';

import type { ActionsObservable } from 'redux-observable';
import type { Store } from 'redux';

export const WS_TASK_PROJECT_FLOW_UNIT_UPDATE_SUCCESS = (
  action$: ActionsObservable<FSAction>,
  store: Store<*, *>
) => {
  return action$.ofType(Actions.WS_TASK_PROJECT_FLOW_UNIT_UPDATE.SUCCESS).mergeMap(action => {
    const payload: {
      project: { name: string },
      report: {
        id: number,
        status: FlowStatus,
        flowResult: FlowResult
      }
    } =
      action.payload;

    const project: Map<Project> = store
      .getState()
      .project.get('projects')
      .find(project => project.get('name') === payload.project.name);

    return project
      ? Observable.of({
          ...action,
          type: Actions.TASK_PROJECT_FLOW_UNIT_UPDATE_WITH_PROJECT.SUCCESS,
          meta: {
            ...(action.meta || {}),
            project
          }
        })
      : Observable.of().ignoreElements();
  });
};

export const WS_TASK_PROJECT_FLOW_START_SUCCESS = (action$: ActionsObservable<FSAction>) => {
  return action$.ofType(Actions.WS_TASK_PROJECT_FLOW_START.SUCCESS).map(action => {
    const payload: { report: { id: number } } = action.payload;

    return Actions.WS_GET_PROJECT_REPORT.request({ id: payload.report.id });
  });
};
