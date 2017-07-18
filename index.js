import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './component/App';
import DashBoardPage from './page/DashBoard/';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as reducers from './reducer';

import listenWS from './server/ws.js';

// import rootEpic from './epic';
// const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({
  ...reducers
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware /* epicMiddleware*/)
);

listenWS(store);

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router history={history}>
        <Route path="/" component={DashBoardPage} />
      </Router>
    </App>
  </Provider>,
  document.getElementById('root')
);
