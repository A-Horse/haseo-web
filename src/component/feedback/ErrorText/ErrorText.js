// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Icon } from 'antd';

import './ErrorText.less';

export class ErrorText extends Component<{
  children: Node
}> {
  render() {
    return (
      <div className="error-text">
        <Icon type="exclamation-circle" />
        {this.props.children}
      </div>
    );
  }
}
