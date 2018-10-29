/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { setupAxiosInterceptor, setupAxiosJwtHeader } from './util/axios-helper';

import './style/index.scss';
import './style/antd.less';

setupAxiosInterceptor();
setupAxiosJwtHeader(window.localStorage.getItem('jwt'));

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHistory, faPlay, faCode, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';

library.add(faHistory);
library.add(faPlay);
library.add(faCode);
library.add(faStarOfDavid);

import Root from './page/Root/Root';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  window.document.getElementById('root')
);
