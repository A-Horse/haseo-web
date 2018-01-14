import axios from 'axios';
import history from '../service/history';
import { Promise } from 'es6-promise';

export function setupAxios() {
  axios.defaults.headers.common['jwt'] = window.localStorage.getItem('jwt');
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      return Promise.reject(error);
    }
  );
}
