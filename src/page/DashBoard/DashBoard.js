// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Actions from '../../action/actions';
import toJS from '../../util/immutable-to-js';
import DashBoardProjectItem from './Project';
import { Row, Col } from 'antd';
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

class DashBoard extends Component<{
  actions: Object,
  projects: Array<Project>
}> {
  componentWillMount() {
    this.props.actions.WS_LISTEN_PROJECTS_UPDATE_REQUEST();
    this.props.actions.WS_GET_PROJECTS_REQUEST();
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="dashboard">
        <div className="project-list">
          {projects.map(project => (
            <DashBoardProjectItem actions={this.props.actions} key={project.name} project={project} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
