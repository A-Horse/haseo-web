// @flow
import R from 'ramda';
import Actions from '../action/actions';
import ws from '../service/socket';
import { Store } from 'redux';

export const listenWS = (store: Store) => {
  const { dispatch } = store;

  ws.open$.subscribe(() => {
    ws.sendJSON({
      type: 'WS_AUTH_REQUEST',
      payload: window.localStorage.getItem('jwt')
    });
  });

  ws.message$.subscribe(revent => {
    const event: FSAction = JSON.parse(revent.data);
    const [actionName, status: ActionType] = R.compose(
      R.map(R.join('_')),
      R.splitAt(-1),
      R.split('_')
    )(event.type);

    const actionAdapter: ActionAdapter = Actions[actionName];

    if (!actionAdapter) {
      throw new Error(`Can not found action "${actionName}" adapter`);
    }

    // $flow-ignore
    const actionFn = actionAdapter[status.toLowerCase()];

    dispatch(actionFn(event.payload, event.meta));
  });
};
