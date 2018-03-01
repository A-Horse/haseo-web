import { merge, reduce } from 'ramda';

function requireAll(r) {
  return r.keys().map(r);
}
const reduders = requireAll(require.context('./', true, /reducer.js$/));

export default reduce(merge, {}, reduders);
