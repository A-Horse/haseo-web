// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Logo } from '../../component/Logo/Logo';
import { makeActionRequestCollection } from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import LoginFrom from './LoginForm';

import './Login.scss';

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.auth.get('isLoginSuccess'),
    loginErrorMessage: state.auth.get('loginErrorMessage')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class Login extends Component<{
  actions: Object,
  loginErrorMessage: string,
  isLoginSuccess: boolean
}> {
  render() {
    return (
      <div className="login-container">
        <div className="logo">
          <Logo />
        </div>

        <div>
          <div className="login-text">
            <span>❱❱</span>
            Login:
          </div>
          <LoginFrom
            loginErrorMessage={this.props.loginErrorMessage}
            isLoginSuccess={this.props.isLoginSuccess}
            loginFn={this.props.actions.LOGIN_REQUEST}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(Login)));
