import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Link } from 'react-router-dom';

import Status from './Status';
import ProjectFlow from './ProjectFlow';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.any.isRequired
  };

  render() {
    const { project } = this.props;
    return (
      <div className={`project${project.status.isRunning ? ' running' : ''}`}>
        <Status status={project.status} />
        <Link className="name" to={`/project/${project.name}`}>
          {project.name}
        </Link>
        <ProjectFlow flows={project.flowState} />
        <button
          className="project-start-button"
          onClick={() => this.props.actions.WS_START_PROJECT_FLOW_REQUEST({ name: project.name })}
        >
          <i className="fa fa-play-circle-o" aria-hidden="true" />
        </button>
      </div>
    );
  }
}
