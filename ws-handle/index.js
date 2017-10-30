import Actions from '../action/actions';

import { ws } from '../util/ws';

export const listenWS = store => {
  const { dispatch } = store;

  ws.onopen = function() {
    ws.sendJSON({
      type: 'AUTH',
      playload: window.localStorage.getItem('jwt')
    });
    ws.sendJSON({
      type: 'GET_PROJECTS'
    });
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
