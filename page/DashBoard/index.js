import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Actions from '../../action/actions';
import toJS from '../../util/immutable-to-js';
import Project from './Project';
import { makeActionRequestCollection } from '../../action/actions';
import './index.scss';

const mapStateToProps = (state, props) => {
  return {
    projects: state.projects.get('items').toList()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class DashBoard extends Component {
  componentWillMount() {
    this.props.actions.WS_GET_PROJECTS_REQUEST();
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="dashboard">
        <div className="project-list">
          {projects.map(project => (
            <Project actions={this.props.actions} key={project.name} project={project} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
