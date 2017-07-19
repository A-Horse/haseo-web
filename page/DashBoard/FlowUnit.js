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
    if (flow.isFailure) {
      className = 'failure';
    } else if (flow.isSuccess) {
      className = 'success';
    } else if (flow.isRunning) {
      className = 'running';
    }

    return (
      <div className={`flow-unit ${className}`}>
        {flow.name}
      </div>
    );
  }
}
