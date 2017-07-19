import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

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
        <span>
          {project.name}
        </span>
        <ProjectFlow flows={project.flows} />
      </div>
    );
  }
}
