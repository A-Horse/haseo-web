import R from 'ramda';
import { Map } from 'immutable';
import Actions from '../action/actions';

export function auth(state = Map({ loginSuccess: false }), action) {
  switch (action.type) {
    case Actions.LOGIN.REQUEST:
      return state.update('isLoginSuccess', R.F);
      break;
    case Actions.LOGIN.SUCCESS:
      return state.update('isLoginSuccess', R.T);
      break;
    case Actions.LOGIN.FAILURE:
      return state.update('loginError', () => action.playload);
      break;
    default:
      return state;
  }
}
