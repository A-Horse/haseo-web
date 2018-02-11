// @flow
import React, { Component } from 'react';
import type { Element } from 'react';

import { Layout } from 'antd';
const { Header, Content } = Layout;

export default class App extends Component<{
  children: Element<*>
}> {
  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}
