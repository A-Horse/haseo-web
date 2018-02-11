import { Promise } from 'es6-promise';
import history from '../history';

export function responseSuccessInterceptor(response) {
  return response;
}
export function responseFailureInterceptor(error) {
  if (error.response.status === 401) {
    window.localStorage.removeItem('jwt');
    history.push('/login');
  }
  return Promise.reject(error);
}
