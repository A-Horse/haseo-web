// @flow
import { Map, fromJS } from 'immutable';
import Actions from '../action/actions';

export function auth(state: Map<string, *> = Map({}), action: FSAction) {
  switch (action.type) {
    case Actions.LOGIN.REQUEST:
      return state.update('loginErrorMessage', () => null);
    case Actions.LOGIN.SUCCESS:
      return state.update('loginErrorMessage', () => null);
    case Actions.LOGIN.FAILURE:
      return state.update('loginErrorMessage', () => action.payload);

    case Actions.GET_SELF_INFO.SUCCESS:
      return state.update('user', () => fromJS(action.payload));
    default:
      return state;
  }
}
