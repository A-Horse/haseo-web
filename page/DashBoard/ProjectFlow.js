import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import FlowUnit from './FlowUnit';

export default class ProjectFlow extends Component {
  static propTypes = {
    flows: PropTypes.array.isRequired
  };

  render() {
    const { flows } = this.props;
    return (
      <div className="project-flow">
        {flows.map(flow => {
          return <FlowUnit key={flow.name} flow={flow} />;
        })}
      </div>
    );
  }
}
