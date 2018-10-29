// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import LoginFrom from './LoginForm';

import './Login.less';

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
        <h2 className="login-text">
          <span style={{ color: '#7e6c6a' }}>❱❱</span>
          Login:
        </h2>
        <LoginFrom
          loginErrorMessage={this.props.loginErrorMessage}
          isLoginSuccess={this.props.isLoginSuccess}
          loginFn={this.props.actions.LOGIN_REQUEST}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(Login))
);
