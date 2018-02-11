// @flow
import axios from 'axios';
import {
  responseSuccessInterceptor,
  responseFailureInterceptor
} from '../service/intercetor/response.intercetor.js';

export function setupAxiosInterceptor() {
  axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
}

export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['jwt'] = jwt;
}
