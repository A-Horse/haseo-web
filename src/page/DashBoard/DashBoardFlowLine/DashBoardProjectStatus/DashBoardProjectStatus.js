// @flow
import React, { Component } from 'react';
import { Icon } from 'antd';

export class DashBoardProjectStatus extends Component<{
  status: any
}> {
  render() {
    const { status } = this.props;
    let statusDom;
    if (status.isWaitting) {
      statusDom = <Icon type="clock-circle" />;
    } else if (status.isRunning) {
      statusDom = <Icon type="loading" />;
    } else if (status.isSuccess) {
      statusDom = <Icon type="check-circle" />;
    } else {
      statusDom = <Icon type="close-circle" />;
    }

    return <div className="project-status">{statusDom}</div>;
  }
}
