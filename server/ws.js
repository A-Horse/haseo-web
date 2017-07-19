import Actions from '../action/actions';

export default function listenWS(store) {
  const { dispatch } = store;
  const ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onopen = function(event) {
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
      default:
        break;
    }
  };
}
