// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

import { Layout } from 'antd';
const { Header, Content } = Layout;

import { AppHeader } from './Header/Header';

import './App.less';

export class App extends Component<{
  children: Node
}> {
  render() {
    return (
      <Layout>
        <Header>
          <AppHeader />
        </Header>
        <Content className="app-content">{this.props.children}</Content>
      </Layout>
    );
  }
}
