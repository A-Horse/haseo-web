// @flow
import R from 'ramda';
import { Map } from 'immutable';
import Actions from '../action/actions';

export function auth(state: Map<string, *> = Map({}), action: FSAction) {
  switch (action.type) {
    case Actions.LOGIN.REQUEST:
      return state.update('loginErrorMessage', () => null);
    case Actions.LOGIN.SUCCESS:
      return state.update('loginErrorMessage', () => null);
    case Actions.LOGIN.FAILURE:
      return state.update('loginErrorMessage', () => action.payload);
    default:
      return state;
  }
}
