// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import toJS from '../../util/immutable-to-js';
import { AppHeader } from '../Header/Header';
import { makeActionRequestCollection } from '../../action/actions';
import { bindActionCreators } from 'redux';
import DI from '../../service/di';
import { AuthService } from '../../service/auth.service';

const { Header, Content } = Layout;
import './App.less';

const mapStateToProps = state => {
  return { user: state.auth.get('user') };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const authService: AuthService = DI.get(AuthService);

class App extends Component<{
  children: Node,
  actions: { [*]: * },
  user: Object
}> {
  render() {
    if (!authService.checkJwt()) {
      return <Redirect to={'/login'} />;
    }
    return (
      <Layout className="app">
        <Header>
          <AppHeader user={this.props.user} logout={this.props.actions.LOGOUT_REQUEST} />
        </Header>
        <Content className="app-content">{this.props.children}</Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(App));
