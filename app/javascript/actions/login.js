import axios from 'axios';
import {serverDomain} from '../env';
import _ from 'lodash';

export function hideLoginModal() {
  return {
    type: 'HIDE_LOGIN_MODAL',
  };
}

export function showLoginModal() {
  return {
    type: 'SHOW_LOGIN_MODAL',
  };
}

function loggedIn(user) {
  return {
    type: 'LOGGED_IN',
    user
  }
}

export function loginWithEmail(email, password) {
  return (dispatch, getState) => {
    let url = `${serverDomain}/auth/signin`;

    return axios.post(url, {email, password}).then((response) => {
      return dispatch(loggedIn(response.data));
    }).catch(error => {
      let message;
      if (error.response) {
        message = _.get(error.response, 'data.error') || "An Unknown Error Occurred", 'error';
      } else {
        message = error.message || error.data || "An Unknown Error Occurred", 'error';
      };
      return Promise.reject(message);
    });
  }
}