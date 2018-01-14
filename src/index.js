import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './component/App';
import DashBoardPage from './page/DashBoard/DashBoard';
import ProjectDetailPage from './page/ProjectDetail/ProjectDetail.container';
import ProjectOutputPage from './page/ProjectOutput/ProjectOutput';
import LoginPage from './page/Login/Login.container';

import reducers from './reducer';
import rootEpic from './epic';

import history from './util/history';

import { listenWS } from './ws-handle/';

import './style/index.scss';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({
  ...reducers
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, epicMiddleware));
listenWS(store);

import './util/setup-axios';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/dashboard" component={DashBoardPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/project/:projectName" component={ProjectDetailPage} />
          <Route
            path="/project/:projectName/:projectReportId/output"
            component={ProjectOutputPage}
          />
          <Route component={() => <Redirect to={'/dashboard'} />} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
