// @flow
import React, { Component } from 'react';

import './Logo.scss';

export class Logo extends Component<{}> {
  render() {
    return <img className="logo" alt="logo" src="/assets/haseo-logo.jpg" />;
  }
}
