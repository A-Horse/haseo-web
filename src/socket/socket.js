// @flow
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

export function createSocket$(): WebSocketSubject<FSAction> {
  return Observable.webSocket(`ws://${location.host}/ws`);
}
