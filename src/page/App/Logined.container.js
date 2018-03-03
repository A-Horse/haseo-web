// @flow
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import type { Dispatch } from 'redux';
import type { Node } from 'react';

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class LoginedContainer extends Component<{
  actions: Object,
  children: Node
}> {
  componentWillMount() {
    this.props.actions.GET_SELF_INFO_REQUEST();
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginedContainer));
