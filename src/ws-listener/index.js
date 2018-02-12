// @flow

import R from 'ramda';
import Actions from '../action/actions';
import { Store } from 'redux';

export const createSocketDispatcher = (store: Store, webSocket: any) => {
  const { dispatch } = store;

  webSocket.message$.subscribe((revent): void => {
    const event: FSAction = JSON.parse(revent.data);

    // $flow-ignore
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
