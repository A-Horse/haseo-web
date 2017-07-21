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
      <div className="project">
        <Status status={project.status} />
        <Link to={`/project/${project.name}`}>
          {project.name}
        </Link>
        <ProjectFlow flows={project.flows} />
        <button
          className="project-start-button"
          onClick={this.props.actions.startBuild({ name: project.name })}
        >
          <i className="fa fa-play" aria-hidden="true" />
        </button>
      </div>
    );
  }
}
