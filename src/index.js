/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { setupAxiosInterceptor, setupAxiosJwtHeader } from './util/axios-helper';

import './style/index.scss';
import './style/antd.less';

setupAxiosInterceptor();
setupAxiosJwtHeader(window.localStorage.getItem('jwt'));

import Root from './page/Root/Root';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  window.document.getElementById('root')
);
