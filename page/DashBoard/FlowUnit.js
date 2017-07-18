import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

export default class FlowUnit extends Component {
  static propTypes = {
    flow: PropTypes.object.isRequired
  };

  render() {
    const { flow } = this.props;
    return (
      <div className="flow-unit">
        {flow.name}
      </div>
    );
  }
}
