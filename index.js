import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './component/App';
import DashBoardPage from './page/DashBoard/';
import ProjectDetail from './page/ProjectDetail/';

import * as reducers from './reducer';

import { listenWS, wsMiddleware } from './server/ws.js';

import './style/index.scss';

const reducer = combineReducers({
  ...reducers
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, wsMiddleware));
listenWS(store);

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={DashBoardPage} />
          <Route path="/project/:projectName" component={ProjectDetail} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
