import Actions from '../action/actions';
import history from '../service/history';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import R from 'ramda';

import { ws, onWsOpen, getOnOpenListeners } from '../service/socket';

export const PROXY_ACTION_TO_WS = action$ =>
  action$
    .filter(action => R.test(/^WS.+REQUEST$/, action.type))
    .do(action => {
      if (ws.readyState) {
        ws.sendJSON(action);
      } else {
        onWsOpen(() => {
          ws.sendJSON(action);
        });
      }
    })
    .ignoreElements();

export const WS_AUTH_SUCCESS = action$ =>
  action$
    .ofType(Actions.WS_AUTH.SUCCESS)
    .do(() => {
      getOnOpenListeners().forEach(fn => fn());
    })
    .ignoreElements();

export const WS_AUTH_FAILURE = action$ =>
  action$
    .ofType(Actions.WS_AUTH.FAILURE)
    .do(() => {
      window.localStorage.removeItem('jwt');
      history.push('/login');
    })
    .ignoreElements();
