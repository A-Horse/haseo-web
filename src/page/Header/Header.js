// @flow
import React, { Component } from 'react';
import { Logo } from '../../component/Logo/Logo';
import { Divider, Button } from 'antd';
import { Link } from 'react-router-dom';

import './Header.less';

export class AppHeader extends Component<{
  user: User,
  logout: Function
}> {
  render() {
    return (
      <header className="app-header">
        <Link to="/">
          <div className="header-ban">
            <Logo />
            <span>Haseo</span>
          </div>
        </Link>

        {this.props.user && (
          <div className="header-user">
            <span>{this.props.user.username}</span>
            <Divider type="vertical" />
            <Button onClick={this.props.logout}>logout</Button>
          </div>
        )}
      </header>
    );
  }
}
