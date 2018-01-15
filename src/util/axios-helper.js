import axios from 'axios';
import {
  responseSuccessInterceptor,
  responseFailureInterceptor
} from '../service/intercetor/response.intercetor.js';

export function setupAxios() {
  axios.defaults.headers.common['jwt'] = window.localStorage.getItem('jwt');
  axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
}
