import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, props) => {
  return {};
};

class DashBoard extends Component {
  render() {
    return <div>hi</div>;
  }
}

export default withRouter(connect(mapStateToProps)(DashBoard));
