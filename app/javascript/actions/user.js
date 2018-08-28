import axios from 'axios';
import {serverDomain} from '../env';

function requestUser() {
  return {
    type: 'REQUEST_USER',
  };
}

function receiveUser(json) {
  return {
    type: 'RECEIVE_USER',
    user: json,
  };
}

export function fetchUser() {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    let url = `${serverDomain}users/me`;

    const headers = {
      headers: {'Authorization': apiToken, 'User-Email': userEmail}
    };

    dispatch(requestUser());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveUser(response.data));
    }).catch(error => console.log(error));
  }
}