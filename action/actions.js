const actionNames = ['GET_PROJECT'];

const actions = actionNames.reduce((result, actionNames) => {
  const REQUEST_SYMBOL = new Symbol();
  const SUCCESS_SYMBOL = new Symbol();
  const FAILURE_SYMBOL = new Symbol();
  result[actionNames] = {
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
}, {});

export default actions;
