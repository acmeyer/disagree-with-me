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

export function hideConfirmEmailModal() {
  return {
    type: 'HIDE_CONFIRM_EMAIL_MODAL',
  };
}

export function showConfirmEmailModal(view, email) {
  return {
    type: 'SHOW_CONFIRM_EMAIL_MODAL',
    view,
    email
  };
}

export function resendConfirmEmail(email) {
  return (dispatch, getState) => {
    let url = `${serverDomain}/auth/resend_confirmation_email`;

    return axios.post(url, {email}).then(() => {
      return;
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

function oauthLogin(data) {
  const url = `${serverDomain}/auth/oauth`;

  return axios.post(url, data).then((response) => {
    return response.data;
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

function loginWithGoogle()  {
  return new Promise((resolve, reject) => {
    const auth2 = gapi.auth2.getAuthInstance();
    return auth2.signIn({scope: 'email'}).then(result => {
      const profile = result.getBasicProfile();
      const authResponse = result.getAuthResponse();
      const data = {
        provider: 'google',
        uid: profile.getId(),
        token: authResponse.access_token,
        email: profile.getEmail()
      }
      return oauthLogin(data).then((user) => resolve(user));
    }).catch(err => reject(err.error));
  });
}

function loginWithFacebook() {
  return new Promise((resolve, reject) => {
    FB.login(response => {
      if (response.authResponse) {
        let {
          accessToken,
          grantedScopes,
          userID,
        } = response.authResponse;
        if (grantedScopes.split(',').includes('email')) {
          FB.api('/me', {fields: 'email'}, function(response) {
            const email = response.email;
            const data = {
              provider: 'facebook',
              token: accessToken,
              uid: userID,
              email,
            }
            return oauthLogin(data).then((user) => resolve(user));
          });
        } else {
          return reject('Email permission is required.');
        }
      } else {
        return reject('Cancelled login/permissions not authorized.');
      }
    }, {scope: 'email', return_scopes: true});
  });
}

export function loginWithAuthProvider(provider) {
  return (dispatch, getState) => {
    if (provider === 'facebook') {
      return loginWithFacebook().then(user => {
        return dispatch(loggedIn(user));
      })
    } else if (provider === 'google') {
      return loginWithGoogle().then(user => {
        return dispatch(loggedIn(user));
      });
    } else {
      return Promise.reject('Auth provider not supported.');
    }
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