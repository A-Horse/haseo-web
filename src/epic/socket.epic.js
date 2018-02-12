// @flow
import R from 'ramda';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import DI from '../service/di';
import { AuthService } from '../service/auth.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';

import type { ActionsObservable } from 'redux-observable';

export const PROXY_ACTION_TO_WS = (
  action$: ActionsObservable<FSAction>,
  store: Store,
  socket$: WebSocketSubject<FSAction>
) =>
  action$
    .filter(action => R.test(/^WS.+REQUEST$/, action.type))
    .do((action: FSAction) => {
      const authService: AuthService = DI.get(AuthService);
      const jwt: string = authService.getJwt();
      // $flow-ignore
      const actionWithMetaJwt = R.mergeDeepRight(action, { meta: { jwt } });
      socket$.next(JSON.stringify(actionWithMetaJwt));
    })
    .ignoreElements();
