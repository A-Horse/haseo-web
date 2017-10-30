import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import Actions from '../action/actions';
import R from 'ramda';

import { ws } from '../util/ws';

// export const START_PROJECT_FLOW_REQUEST = action$ => {
//   return action$.ofType(Actions.WS_START_PROJECT_FLOW.REQUEST).do(action => {
//     ws.sendJSON({
//       type: 'START_PROJECT_FLOW',
//       playload: action.playload
//     });
//   });
// };

export const PROXY_ACTION_TO_WS = action$ =>
  action$
    .filter(action => R.allPass([R.prop('type'), R.match(/^WS.+REQUEST$/)])(action))
    .do(ws.sendJSON);
