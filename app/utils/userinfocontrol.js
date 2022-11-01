// import _ from 'lodash';

export const setAccessToken = accessToken => {
  document.cookie = `access_token=${accessToken}`;
};
