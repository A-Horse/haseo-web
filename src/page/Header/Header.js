// @flow
import React, { Component } from 'react';
import { Logo } from '../../component/Logo/Logo';
import { Divider } from 'antd';

import './Header.less';

export class AppHeader extends Component<{}> {
  render() {
    return (
      <header className="app-header">
        <div className="header-ban">
          <Logo />
          <span>Haseo</span>
        </div>

        <div>
          <span>name</span>
          <Divider type="vertical" />
          <span>logout</span>
        </div>
      </header>
    );
  }
}
