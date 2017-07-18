import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
import ProjectFlow from './ProjectFlow';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.any.isRequired
  };

  render() {
    const { project } = this.props;
    return (
      <div className="project">
        <span>
          {project.name}
        </span>
        <ProjectFlow flows={project.flows} />
      </div>
    );
  }
}
