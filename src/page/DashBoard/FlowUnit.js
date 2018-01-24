// @flow
import React, { Component } from 'react';
import R from 'ramda';

export default class FlowUnit extends Component<{
  flowState: FlowState
}> {
  render() {
    console.log(1);
    const { flowState } = this.props;
    const className = flowState.status.toLowerCase();
    return <div className={`flow-unit ${className}`}>{flowState.name}</div>;
  }
}
