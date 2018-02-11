// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

import { Layout } from 'antd';
const { Header, Content } = Layout;

import { AppHeader } from './Header/Header';

export default class App extends Component<{
  children: Node
}> {
  render() {
    return (
      <Layout>
        <Header>
          <AppHeader />
        </Header>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}
