// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './page/App';
import DashBoardPage from './page/DashBoard/DashBoard';
import ProjectDetailPage from './page/ProjectDetail/ProjectDetail.container';
import ProjectReport from './page/ProjectReport/ProjectReport.container';
import ProjectOutputPage from './page/ProjectOutput/ProjectOutput';
import LoginPage from './page/Login/Login.container';

import reducers from './reducer';
import rootEpic from './epic';

import history from './service/history';

import ws from './service/socket';
import { listenWS } from './ws-listener/';

import { setupAxiosInterceptor, setupAxiosJwtHeader } from './util/axios-helper';

import './style/index.scss';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({
  ...reducers
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, epicMiddleware));

ws.start();
listenWS(store);

setupAxiosInterceptor();
setupAxiosJwtHeader(window.localStorage.getItem('jwt'));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/dashboard" component={DashBoardPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/project/:projectName" component={ProjectDetailPage} />
          <Route exact path="/project/:projectName/:projectReportId" component={ProjectReport} />
          <Route
            path="/project/:projectName/:projectReportId/output"
            component={ProjectOutputPage}
          />
          <Route component={() => <Redirect to={'/dashboard'} />} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  window.document.getElementById('root')
);
