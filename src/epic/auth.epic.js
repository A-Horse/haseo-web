import { Observable } from 'rxjs/Observable';
import history from '../service/history';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/ignoreElements';

import Actions from '../action/actions';
import axios from 'axios';
import { setupAxios } from '../util/axios-helper';

export const LOGIN_REQUEST = action$ => {
  return action$.ofType(Actions.LOGIN.REQUEST).mergeMap(action => {
    return axios
      .post('/api/signin', action.payload)
      .then(response => {
        window.localStorage.setItem('jwt', response.headers.jwt);
        setupAxios();
        return Actions.LOGIN.success(response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          return Actions.LOGIN.failure({ type: 'AuthError' });
        }
        return Actions.LOGIN.failure({ type: 'Unknown' });
      });
  });
};

export const LOGIN_SUCCESS = action$ =>
  action$
    .ofType(Actions.LOGIN.SUCCESS)
    .do(() => {
      // TODO 重新连接 websocket
      history.push('/dashboard');
    })
    .ignoreElements();
