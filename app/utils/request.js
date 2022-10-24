import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIES } from './constants';
import { handleError } from './handleError';
import { MOOK_DATA_GET } from '../mookData/mookDataGet';
import { MOOK_DATA_POST } from '../mookData/mookDataPost';

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const instance = axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'production'
      ? window.SystemConfig.URL
      : 'https://reqres.in/api'
  }/Api`,
});

instance.defaults.timeout = 25000;

instance.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${Cookies.get(COOKIES.access_token)}`;
  return req;
});

instance.interceptors.response.use(
  response => response,
  error => {
    const responseError = {
      ...error,
      response: {
        ...error.response,
      },
    };

    if (error.response) {
      handleError(error.response);
    }

    return responseError;
  },
);

export async function axiosGet(path, body) {
  if (MOOK_DATA_GET[path].switch) return MOOK_DATA_GET[path];
  const res = await instance
    .post(path, body)
    .then(checkStatus)
    .catch(error => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
  return res;
}

export async function axiosPost(path, body) {
  if (MOOK_DATA_POST[path].switch) return MOOK_DATA_POST[path];
  const res = await instance
    .post(path, body)
    .then(checkStatus)
    .catch(error => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
  return res;
}
