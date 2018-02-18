// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import R from 'ramda';

import { DashBoardProjectStatus } from './DashBoardProjectStatus/DashBoardProjectStatus';
import { ProjectFlows } from '../../../component/ProjectFlow/ProjectFlows';

import './DashBoardFlowLine.less';

export class DashBoardFlowLine extends Component<{
  actions: Object,
  flowLine: FlowLine
}> {
  render() {
    const { flowLine } = this.props;
    return (
      <div className="dashboard-project">
        {/* <Status status={project.status} /> */}
        <Link className="name" to={`/project/${flowLine.project.name}`}>
          {flowLine.project.name}
        </Link>
        <ProjectFlows flows={flowLine.flows} />
        <button
          className="project-start-button"
          onClick={() =>
            this.props.actions.WS_START_PROJECT_FLOW_REQUEST({ name: flowLine.project.name })}
        >
          <Icon type="right-circle-o" />
        </button>
      </div>
    );
  }
}
