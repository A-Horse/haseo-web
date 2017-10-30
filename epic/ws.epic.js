import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import Actions from '../action/actions';
import R from 'ramda';

import { ws, onWsOpen } from '../util/ws';

// export const START_PROJECT_FLOW_REQUEST = action$ => {
//   return action$.ofType(Actions.WS_START_PROJECT_FLOW.REQUEST).do(action => {
//     ws.sendJSON({
//       type: 'START_PROJECT_FLOW',
//       playload: action.playload
//     });
//   });
// };
console.log(Observable.of({ hi: 'j' }));

export const PROXY_ACTION_TO_WS = action$ =>
  action$
    .filter(action => R.test(/^WS.+REQUEST$/, action.type))
    .do(action => {
      if (ws.readyState) {
        ws.sendJSON(action);
      } else {
        onWsOpen(() => {
          console.log('hihihihih');
        });
      }
    })
    .ignoreElements();
