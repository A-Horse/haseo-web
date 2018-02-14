// @flow
import { combineEpics } from 'redux-observable';
import R from 'ramda';

function requireAll(r) {
  return r.keys().map(r);
}

// $flow-ignore
const epicGroups = requireAll(require.context('./', true, /epic.js$/));
const epics = R.flatten(R.map(R.values, epicGroups));

// $flow-ignore
const rootEpic = combineEpics(...epics);

export default rootEpic;
