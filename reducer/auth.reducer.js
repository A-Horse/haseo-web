import Actions from '../action/actions';
import R from 'ramda';
import { Map, List, fromJS } from 'immutable';

export function auth(state = Map({ loginSuccess: false }), action) {
  console.log(action);
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
