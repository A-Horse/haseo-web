import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import Actions from '../action/actions';
import axios from 'axios';

export const LOGIN_REQUEST = action$ => {
  return action$.ofType(Actions.LOGIN.REQUEST).mergeMap(action => {
    return axios
      .post('/api/signin', action.payload)
      .then(response => {
        window.localStorage.setItem('jwt', response.headers.jwt);
        axios.defaults.headers.common['jwt'] = response.headers.jwt;
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
