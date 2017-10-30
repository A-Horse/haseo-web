import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import R from 'ramda';

import { ws, onWsOpen } from '../util/ws';

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
