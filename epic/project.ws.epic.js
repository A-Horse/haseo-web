import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import Actions from '../action/actions';

import { ws } from '../util/ws';

export const START_PROJECT_FLOW_REQUEST = action$ => {
  return action$.ofType(Actions.START_PROJECT_FLOW.REQUEST).do(action => {
    ws.send(
      JSON.stringify({
        type: 'START_PROJECT_FLOW',
        playload: action.playload
      })
    );
  });
};
