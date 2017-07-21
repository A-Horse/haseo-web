const actionNames = ['GET_PROJECTS', 'START_PROJECT_FLOW', 'RECEIVED_PROJECT'];

const actions = actionNames.reduce((result, actionName) => {
  const REQUEST_SYMBOL = actionName + '_REQUEST';
  const SUCCESS_SYMBOL = actionName + '_SUCCESS';
  const FAILURE_SYMBOL = actionName + '_FAILURE';
  result[actionName] = {
    REQUEST: REQUEST_SYMBOL,
    SUCCESS: SUCCESS_SYMBOL,
    FAILURE: FAILURE_SYMBOL,
    request: (playload, meta) => ({
      type: REQUEST_SYMBOL,
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
