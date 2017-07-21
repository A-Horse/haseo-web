import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

export default class Status extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired
  };

  render() {
    const { status } = this.props;
    let statusName;
    if (status.isRunning) {
      statusName = 'Running';
    } else if (status.isSuccess) {
      statusName = 'Success';
    } else {
      statusName = 'Failure';
    }

    return (
      <div>
        {statusName}
      </div>
    );
  }
}
