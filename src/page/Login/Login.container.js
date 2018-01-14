import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import autobind from 'autobind-decorator';

import LoginFrom from './LoginForm';

const mapStateToProps = (state, props) => {
  return {
    isLoginSuccess: state.auth.get('isLoginSuccess'),
    loginError: state.auth.get('loginError')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="logo">
          <img alt="" src="" />
        </div>

        <div>
          <LoginFrom
            loginError={this.props.loginError}
            isLoginSuccess={this.props.isLoginSuccess}
            login={this.props.actions.LOGIN_REQUEST}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(Login)));
