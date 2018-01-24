// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';

import Status from './Status';
import ProjectFlow from './ProjectFlow';

export default class DashBoardProjectItem extends Component<{
  project: Project,
  actions: Object
}> {

  render() {
    const { project } = this.props;
    return (
      <div className={`project${project.status.isRunning ? ' running' : ''}`}>
        <Status status={project.status} />
        <Link className="name" to={`/project/${project.name}`}>
          {project.name}
        </Link>
        <ProjectFlow flowStates={project.flowStates} />
        <button
          className="project-start-button"
          onClick={() => this.props.actions.WS_START_PROJECT_FLOW_REQUEST({ name: project.name })}
        >
          <Icon type="play-circle" />
        </button>
      </div>
    );
  }
}
