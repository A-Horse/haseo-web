import React, { Component } from 'react';
import { AppRouter } from '../../router/Router';
import { DevTools } from '../../tool/DevTools';

export default class Root extends Component {
  render() {
    return (
      <div>
        <AppRouter />
        <DevTools />
      </div>
    );
  }
}
