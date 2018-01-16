// @flow
import { Subject } from 'rxjs/Subject';

class Socket {
  ws = null;
  onopenListeners = [];
  open$ = new Subject();
  message$ = new Subject();

  constructor() {}

  start() {
    this.openSocket();
  }

  openSocket() {
    const ws = new WebSocket(`ws://${location.host}/ws`);
    // TODO close and delete old ws
    this.ws = ws;

    ws.onopen = () => {
      this.open$.next();
    };
    ws.onmessage = revent => {
      this.message$.next(revent);
    };
  }

  sendJSON(data) {
    if (!this.ws) {
      throw new Error('WebSocket not initial!');
    }
    this.ws.send(JSON.stringify(data));
  }

  getSocket() {
    return this.ws;
  }

  onWsOpen(fn) {
    this.onopenListeners.push(fn);
  }

  getOnOpenListeners() {
    return this.onopenListeners;
  }

  removeAllOnOpenListeners() {
    this.onopenListeners = [];
  }
}

export default new Socket();
