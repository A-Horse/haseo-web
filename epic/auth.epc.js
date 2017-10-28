import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Storage } from '../services/storage';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { saveAuthData, getJWT } from 'utils/auth';

export const IDENTIFY_REQUEST = action$ =>
  action$.ofType(Actions.IDENTIFY.REQUEST).mergeMap(action => {
    if (!getJWT()) {
      return Observable.of(Actions.IDENTIFY.failure(new Error('Not auth data.')));
    }
    return http
      .get(makeApiUrl('/user/identify'))
      .then(Actions.IDENTIFY.success)
      .catch(Actions.IDENTIFY.failure);
  });
