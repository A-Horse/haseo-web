export default function listenWS(store) {
  const { dispath } = store;
  const ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onopen = function(event) {
    // ws.send();
  };

  ws.onmessage = function(event) {};
}
