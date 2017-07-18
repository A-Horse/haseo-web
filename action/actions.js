const actionNames = ['GET_PROJECTS'];

const actions = actionNames.reduce((result, actionNames) => {
  const REQUEST_SYMBOL = Symbol();
  const SUCCESS_SYMBOL = Symbol();
  const FAILURE_SYMBOL = Symbol();
  result[actionNames] = {
    REQUEST: REQUEST_SYMBOL,
    SUCCESS: SUCCESS_SYMBOL,
    FAILURE: FAILURE_SYMBOL,
    request: (playload, meta) => ({
      type: FAILURE_SYMBOL,
      playload,
      meta
    }),
    success: (playload, meta) => ({
      type: SUCCESS_SYMBOL,
      playload,
      meta
    }),
    failure: (playload, meta) => ({
      type: FAILURE_SYMBOL,
      error: true,
      playload,
      meta
    })
  };
  return result;
}, {});

export default actions;
