// @flow
import React, { Component } from 'react';
import { Row, Col } from 'antd';

import FlowUnit from './FlowUnit';

export default class ProjectFlow extends Component<{
  flowStates: Array<FlowState>
}> {

  render() {
    const { flowStates } = this.props;
    return (
      <div className="project-flow">
        <Row type="flex" justify="center" align="top">
          {flowStates.map(flowState => {
            return (
              <Col key={flowState.name}>
                <FlowUnit flowState={flowState} />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
