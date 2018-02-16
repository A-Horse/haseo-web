// @flow
import R from 'ramda';
import Actions from '../action/actions';
import type { Store } from 'redux';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

export const createSocketDispatcher = (store: Store<*, *>, socket$: WebSocketSubject<FSAction>) => {
  const { dispatch } = store;

  socket$.retryWhen(error => error.delay(1000)).subscribe((wsAction: FSAction): void => {
    // $flow-ignore
    const [actionName, status: ActionType] = R.compose(
      R.map(R.join('_')),
      R.splitAt(-1),
      R.split('_')
    )(wsAction.type);

    const actionAdapter: ActionAdapter = Actions[actionName];

    if (!actionAdapter) {
      throw new Error(`Can not found action "${actionName}" adapter`);
    }

    // $flow-ignore
    const actionFn = actionAdapter[status.toLowerCase()];

    console.log(actionFn(wsAction.payload, wsAction.meta));
    dispatch(actionFn(wsAction.payload, wsAction.meta));
  });
};
