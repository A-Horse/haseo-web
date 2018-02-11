// @flow
import React, { Component } from 'react';
import type { Element } from 'react';
import { Logo } from '../component/Logo/Logo';

export class Header extends Component<{
  children: Element<*>
}> {
  render() {
    return (
      <header class="header">
        <Logo />
      </header>
    );
  }
}
