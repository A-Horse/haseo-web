// @flow
import React, { Component } from 'react';
import { Row, Col } from 'antd';

import { FlowUnit } from './FlowUnit/FlowUnit';

import './projectFlows.less';

export class ProjectFlows extends Component<{
  flows: Array<Flow>
}> {
  render() {
    const { flows } = this.props;
    return (
      <div className="project-flow">
        <Row type="flex" justify="left" align="top">
          {flows.map((flow: Flow) => {
            return (
              <Col key={flow.name}>
                <FlowUnit flow={flow} />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
