// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import toJS from '../../util/immutable-to-js';
import DashBoardProjectItem from './Project';
import { makeActionRequestCollection } from '../../action/actions';

import './index.scss';

const mapStateToProps = state => {
  const projects = state.projects.get('projects');
  return {
    projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class DashBoard extends Component<{
  actions: Object,
  projects: Array<ProjectData>
}> {
  componentWillMount() {
    this.props.actions.WS_LISTEN_PROJECTS_UPDATE_REQUEST();
    this.props.actions.WS_GET_PROJECTS_REQUEST();
  }

  render() {
    const { projects } = this.props;
    console.log(projects);
    return (
      <div className="dashboard">
        <div className="project-list">
          {projects.map(project => (
            <DashBoardProjectItem
              actions={this.props.actions}
              key={project.name}
              project={project}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
