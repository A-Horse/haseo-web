import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Project from './Project';
import './index.scss';

const mapStateToProps = (state, props) => {
  return {
    projects: state.projects.items
  };
};

class DashBoard extends Component {
  render() {
    return (
      <div className="dashboard">
        {this.props.projects.map(project =>
          <Project key={project.name} project={project} />
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(DashBoard));
