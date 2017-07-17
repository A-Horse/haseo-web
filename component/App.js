import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
