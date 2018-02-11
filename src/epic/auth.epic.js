// @flow
import history from '../service/history';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/ignoreElements';

import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosInterceptor, setupAxiosJwtHeader } from '../util/axios-helper';
import { Observable } from 'rxjs/Observable';

export const LOGIN_REQUEST = (action$: Observable<FSAction>) => {
  return action$.ofType(Actions.LOGIN.REQUEST).mergeMap(action => {
    return axios
      .post('/api/signin', action.payload)
      .then(response => {
        setupAxiosInterceptor();
        setupAxiosJwtHeader(response.headers.jwt);
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

export const LOGIN_SUCCESS = (action$: Observable<FSAction>) =>
  action$
    .ofType(Actions.LOGIN.SUCCESS)
    .do(() => {
      // TODO 重新连接 websocket
      history.push('/dashboard');
    })
    .ignoreElements();
