export const ws = new WebSocket(`ws://${location.host}/ws`);

ws.sendJSON = function(data) {
  ws.send(JSON.stringify(data));
};

let onopenListeners = [];

export function onWsOpen(fn) {
  onopenListeners.push(fn);
}

export function getOnOpenListeners() {
  return onopenListeners;
}
