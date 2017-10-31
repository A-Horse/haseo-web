import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

export default class FlowUnit extends Component {
  static propTypes = {
    flow: PropTypes.object.isRequired
  };

  render() {
    const { flow } = this.props;
    let className;
    if (flow.isRunning) {
      className = 'running'
    } else if (flow.isWaitting) {
      className = 'waitting';
    } else if (flow.isSuccess) {
      className = 'success';
    } else {
      className = 'failure';
    }

    return <div className={`flow-unit ${className}`}>{flow.name}</div>;
  }
}
