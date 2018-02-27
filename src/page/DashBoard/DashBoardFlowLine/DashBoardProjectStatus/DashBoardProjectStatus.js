// @flow
import React, { Component } from 'react';
import { Icon } from 'antd';

export class DashBoardProjectStatus extends Component<{
  status: string
}> {
  render() {
    const { status } = this.props;
    let statusElement;

    switch (status) {
      case 'WAITTING':
        statusElement = <Icon type="clock-circle" />;
        break;

      case 'RUNNING':
        statusElement = <Icon type="loading" />;
        break;

      case 'SUCCESS':
        statusElement = <Icon type="check-circle" />;
        break;

      case 'FAILURE':
        statusElement = <Icon type="close-circle" />;
        break;

      case 'INITAL':
      default:
        statusElement = <Icon type="ellipsis" />;
    }

    return <div className="project-status">{statusElement}</div>;
  }
}
