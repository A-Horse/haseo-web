// @flow
import R from 'ramda';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import Actions from '../action/actions';
import history from '../service/history';
import DI from '../service/di';
import { AuthService } from '../service/auth.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';

import type { ActionsObservable } from 'redux-observable';

export const PROXY_ACTION_TO_WS = (
  action$: Observable<FSAction>,
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

export const WS_AUTH_FAILURE = (action$: ActionsObservable<FSAction>) =>
  action$
    .ofType(Actions.WS_AUTH.FAILURE)
    .do(() => {
      window.localStorage.removeItem('jwt');
      history.push('/login');
    })
    .ignoreElements();
