// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import { DashBoardProjectStatus } from './DashBoardProjectStatus/DashBoardProjectStatus';
import { ProjectFlowProcess } from '../../../component/ProjectFlow/ProjectFlowProcess';

import './DashBoardFlowLine.less';

export class DashBoardFlowLine extends Component<{
  actions: { [string]: Function },
  flowLine: FlowLine
}> {
  render() {
    const { flowLine } = this.props;
    const status = flowLine.report ? flowLine.report.status : 'INITAL';
    return (
      <div className="dashboard-project">
        <DashBoardProjectStatus status={status} />
        <Link className="name" to={`/project/${flowLine.project.name}`}>
          {flowLine.project.name}
        </Link>

        <ProjectFlowProcess status={status} flows={flowLine.flows} />

        <button
          className="project-start-button"
          onClick={() => this.props.actions.WS_START_PROJECT_FLOW_REQUEST({ name: flowLine.project.name })}
        >
          <Icon type="right-circle-o" />
        </button>
      </div>
    );
  }
}
