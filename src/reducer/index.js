import R from 'ramda';

function requireAll(r) {
  return r.keys().map(r);
}
const reduders = requireAll(require.context('./', true, /reducer.js$/));

export default R.reduce(R.merge, {}, reduders);
