import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Actions from '../../action/actions';
import toJS from '../../util/immutable-to-js';
import Project from './Project';
import './index.scss';

const mapStateToProps = (state, props) => {
  return {
    projects: state.projects.get('items').toList()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      startBuild: playload => () => {
        dispatch(Actions.START_PROJECT_FLOW.request(playload));
      }
    },
    dispatch
  };
};

class DashBoard extends Component {
  render() {
    const { projects } = this.props;

    return (
      <div className="dashboard">
        <div className="project-list">
          {projects.map(project =>
            <Project actions={this.props.actions} key={project.name} project={project} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
