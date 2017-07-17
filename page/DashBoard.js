import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { createSelector } from 'reselect';

const mapStateToProps = (state, props) => {
  return {};
};

@connect(mapStateToProps)
export default class DashBoard extends Component {
  render() {
    return <div>hi</div>;
  }
}
