import R from 'ramda';
import Actions from '../action/actions';

import { ws } from '../service/socket';

export const listenWS = store => {
  const { dispatch } = store;

  ws.onopen = function() {
    console.log(window.localStorage.getItem('jwt'));
    ws.sendJSON({
      type: 'WS_AUTH_REQUEST',
      payload: window.localStorage.getItem('jwt')
    });
  };

  ws.onmessage = function(revent) {
    const event = JSON.parse(revent.data);
    const [actionName, status] = R.compose(R.map(R.join('_')), R.splitAt(-1), R.split('_'))(
      event.type
    );

    const actionAdapter = Actions[actionName];

    if (!actionAdapter) {
      throw new Error(`Can not found action "${actionName}" adapter`);
    }

    dispatch(actionAdapter[status.toLowerCase()](event.payload));
  };
};
