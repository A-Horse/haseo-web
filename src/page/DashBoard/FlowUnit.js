// @flow
import React, { Component } from 'react';

export default class FlowUnit extends Component<{
  flowState: FlowState
}> {
  render() {
    const { flowState } = this.props;
    const className = flowState.status.toLowerCase();
    return <div className={`flow-unit ${className}`}>{flowState.name}</div>;
  }
}
