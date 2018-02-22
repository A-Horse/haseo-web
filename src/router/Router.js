// @flow
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';

import { App } from '../page/App';
import DashBoardPage from '../page/DashBoard/DashBoard';
import ProjectDetailPage from '../page/ProjectDetail/ProjectDetail.container';
import ProjectReportPage from '../page/ProjectReport/ProjectReport.container';
import LoginPage from '../page/Login/Login.container';

import history from '../service/history';

export class AppRouter extends Component<{}> {
  render() {
    return (
      <Router history={history}>
        <App>
          <Switch>
            <Route exact path="/dashboard" component={DashBoardPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/project/:projectName" component={ProjectDetailPage} />
            <Route exact path="/project/:projectName/:reportId" component={ProjectReportPage} />
            <Route component={() => <Redirect to={'/dashboard'} />} />
          </Switch>
        </App>
      </Router>
    );
  }
}
