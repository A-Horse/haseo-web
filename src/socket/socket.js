// @flow
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

export function createSocket$(): WebSocketSubject<FSAction> {
  let websocketProtocol;
  if (location.protocol != 'https:') {
    websocketProtocol = 'ws';
  } else {
    websocketProtocol = 'wss';
  }
  return Observable.webSocket(`${websocketProtocol}://${location.host}/ws`);
}
