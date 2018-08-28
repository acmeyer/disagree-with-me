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

function requestUserList() {
  return {
    type: 'REQUEST_USER_LIST',
  };
}

function receiveUserList(json) {
  return {
    type: 'RECEIVE_USER_LIST',
    data: json.posts,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

export function fetchUserBookmarks() {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    let url = `${serverDomain}users/my_bookmarks`;

    const headers = {
      headers: {'Authorization': apiToken, 'User-Email': userEmail}
    };

    dispatch(requestUserList());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveUserList(response.data));
    }).catch(error => console.log(error));
  }
}

export function fetchUserPosts() {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    let url = `${serverDomain}users/my_posts`;

    const headers = {
      headers: {'Authorization': apiToken, 'User-Email': userEmail}
    };

    dispatch(requestUserList());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveUserList(response.data));
    }).catch(error => console.log(error));
  }
}

export function fetchUserResponses() {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    let url = `${serverDomain}users/my_responses`;

    const headers = {
      headers: {'Authorization': apiToken, 'User-Email': userEmail}
    };

    dispatch(requestUserList());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveUserList(response.data));
    }).catch(error => console.log(error));
  }
}