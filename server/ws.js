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
    switch (event.type) {
      case 'PROJECTS':
        dispatch(Actions.GET_PROJECTS.success(event.playload));
        break;
      case 'PROJECT_UPDATE':
        dispatch(Actions.PROJECT_UPDATE.success(event.playload));
        break;
      case 'PROJECT_UNIT_FRAGMENT_UPDATE':
        dispatch(Actions.PROJECT_UNIT_FRAGMENT_UPDATE.success(event.playload));
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
