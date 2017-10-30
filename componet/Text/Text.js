import React, { Component } from 'react';

export default class Text extends Component {
  buildClassName() {
    return 'text';
  }

  render() {
    return <div className={this.buildClassName()}>{this.props.children}</div>;
  }
}
