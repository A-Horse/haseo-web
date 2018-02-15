// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import R from 'ramda';

import { DashBoardProjectStatus } from './DashBoardProjectStatus/DashBoardProjectStatus';
import { ProjectFlows } from '../../../component/ProjectFlow/ProjectFlows';

import './DashBoardProject.less';

export class DashBoardProject extends Component<{
  actions: Object,
  project: Project
}> {
  render() {
    const { project } = this.props;
    return (
      <div className="dashboard-project">
        {/* <Status status={project.status} /> */}
        <Link className="name" to={`/project/${project.name}`}>
          {project.name}
        </Link>
        <ProjectFlows flows={project.flows} />
        <button
          className="project-start-button"
          onClick={() => this.props.actions.WS_START_PROJECT_FLOW_REQUEST({ name: project.name })}
        >
          <Icon type="right-circle-o" />
        </button>
      </div>
    );
  }
}
