// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import DI from './service/di';
import { AuthService } from './service/auth.service';

DI.inject(new AuthService());

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
import { createSocketDispatcher } from './ws-listener/';

import { setupAxiosInterceptor, setupAxiosJwtHeader } from './util/axios-helper';

import './style/index.scss';
import './style/antd.less';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/dom/webSocket';

const socket$ = Observable.webSocket(`ws://${location.host}/ws`);
socket$.subscribe();

// TODO 注入 ws 进去 epic，取消 ws 单例模式
const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: socket$
});

const reducer = combineReducers({
  ...reducers
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, epicMiddleware));

ws.start();
createSocketDispatcher(store, ws);

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
