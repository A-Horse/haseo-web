import Actions from '../action/actions';

const ws = new WebSocket(`ws://${location.host}/ws`);

export const listenWS = store => {
  const { dispatch } = store;
  ws.onopen = function() {
    ws.send(
      JSON.stringify({
        type: 'GET_PROJECTS'
      })
    );
  };

  ws.onmessage = function(revent) {
    const event = JSON.parse(revent.data);
    console.log(event);

    switch (event.type) {
      case 'PROJECTS':
        dispatch(Actions.GET_PROJECTS.success(event.playload));
        break;
      case 'PROEJCT_UPDATE':
        dispatch(Actions.RECEIVED_PROJECT.success(event.playload));
        break;
      default:
        break;
    }
  };
};

export const wsMiddleware = store => next => action => {
  const { dispatch } = store;
  switch (action.type) {
    case Actions.START_PROJECT_FLOW.REQUEST:
      ws.send(
        JSON.stringify({
          type: 'START_PROJECT_FLOW',
          playload: action.playload
        })
      );
      break;
    default:
      break;
  }

  next(action);
};
