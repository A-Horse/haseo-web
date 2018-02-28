// @flow
import React, { Component } from 'react';

import './FlowUnit.less';

export class FlowUnit extends Component<{
  flow: Flow
}> {
  render() {
    const { flow } = this.props;
    return (
      <div className={`flow-unit ${flow.status.toLowerCase()}`}>
        <div className="flow-unit--name">{flow.name}</div>
      </div>
    );
  }
}
