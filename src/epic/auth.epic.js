// @flow
import axios from 'axios';
import { setupAxiosInterceptor, setupAxiosJwtHeader } from '../util/axios-helper';
import Actions from '../action/actions';
import history from '../service/history';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/throttleTime';

import DI from '../service/di';
import { AuthService } from '../service/auth.service';

import type { ActionsObservable } from 'redux-observable';

export const LOGIN_REQUEST = (action$: ActionsObservable<FSAction>) => {
  return action$.ofType(Actions.LOGIN.REQUEST).mergeMap(action => {
    return axios
      .post('/api/signin', action.payload)
      .then(response => {
        const authService: AuthService = DI.get(AuthService);
        const jwt = response.headers.jwt;

        setupAxiosInterceptor();
        setupAxiosJwtHeader(jwt);

        authService.setJwt(jwt);

        return Actions.LOGIN.success(response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          return Actions.LOGIN.failure('Username or Password not match.');
        }
        return Actions.LOGIN.failure('login error');
      });
  });
};

export const LOGIN_SUCCESS = (action$: ActionsObservable<FSAction>) =>
  action$
    .ofType(Actions.LOGIN.SUCCESS)
    .do(() => {
      history.push('/dashboard');
    })
    .ignoreElements();

export const WS_AUTH_FAILURE = (action$: ActionsObservable<FSAction>) =>
  action$
    .ofType(Actions.WS_AUTH.FAILURE)
    .throttleTime(1000)
    .do(() => {
      const authService: AuthService = DI.get(AuthService);
      authService.cleanJwt();
      history.push('/login');
    })
    .ignoreElements();
