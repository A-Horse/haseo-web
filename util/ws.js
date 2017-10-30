export const ws = new WebSocket(`ws://${location.host}/ws`);

ws.sendJSON = function(data) {
  ws.send(JSON.stringify(data));
};
