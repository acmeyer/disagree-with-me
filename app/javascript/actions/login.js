import axios from 'axios';
import {serverDomain} from '../env';
import _ from 'lodash';
import { AppToaster }  from '../components/common/AppToaster';

export function hideLoginModal() {
  return {
    type: 'HIDE_LOGIN_MODAL',
  };
}

export function showLoginModal(view) {
  return {
    type: 'SHOW_LOGIN_MODAL',
    view
  };
}

function loggedIn(user) {
  return {
    type: 'LOGGED_IN',
    user
  }
}

function signedUp(user) {
  return {
    type: 'SIGNED_UP',
    user,
  }
}

function resetPasswordSent(email) {
  return {
    type: 'RESET_PASSWORD_SENT',
    email,
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

export function signupWithEmail(data) {
  return (dispatch, getState) => {
    let url = `${serverDomain}/auth/signup`;

    return axios.post(url, data).then((response) => {
      return dispatch(signedUp(response.data));
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

export function sendResetPasswordEmail(email) {
  return (dispatch, getState) => {
    let url = `${serverDomain}/auth/send_reset_password_instructions`;

    return axios.post(url, {email}).then((response) => {
      return dispatch(resetPasswordSent(email));
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

export function logOut() {
  return (dispatch, getState) => {
    AppToaster.show({ message: "Successfully logged out!", intent: "success", icon: "tick" });
    dispatch({
      type: 'LOGGED_OUT',
    });
  }
}