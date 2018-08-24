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
    const apiToken = getState().user.apiToken;
    let url = `${serverDomain}users/me`;

    dispatch(requestUser());
    return axios.get(url, {headers: {'Authorization': `Token token=${apiToken}`}}).then((response) => {
      dispatch(receiveUser(response.data));
    }).catch(error => console.log(error));
  }
}