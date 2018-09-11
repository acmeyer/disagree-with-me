import axios from 'axios';
import {serverDomain} from '../env';
import { handleAPIError } from '../util/helpers';

function requestUser() {
  return {
    type: 'REQUEST_USER',
  };
}

function receiveUser(json) {
  return {
    type: 'RECEIVED_USER',
    user: json,
  };
}

export function fetchUser() {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    let url = `${serverDomain}/users/me`;

    const headers = {
      headers: {'Authorization': apiToken, 'User-Email': userEmail}
    };

    dispatch(requestUser());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveUser(response.data));
    }).catch(error => handleAPIError(error));
  }
}

function requestUserList() {
  return {
    type: 'REQUEST_USER_LIST',
  };
}

function requestMoreUserList() {
  return {
    type: 'REQUEST_MORE_USER_LIST',
  };
}

function receiveUserList(json) {
  let data = json.posts ? json.posts : json.responses;
  return {
    type: 'RECEIVED_USER_LIST',
    list_type: json.posts ? 'posts' : 'responses',
    data,
    moreResults: json.more_results,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

export function fetchUserList(list = 'posts', page = 1) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    let listPath;
    if (list === 'bookmarks') {
      listPath = "my_bookmarks";
    } else if (list === 'posts') {
      listPath = "my_posts";
    } else if (list === 'responses') {
      listPath = "my_responses";
    } else if (list === 'thanks') {
      listPath = "my_thanks";
    } else if (list === 'post-upvotes') {
      listPath = "my_post_upvotes";
    } else if (list === 'response-upvotes') {
      listPath = "my_response_upvotes";
    }
    let url = `${serverDomain}/users/${listPath}?page=${page}`;

    const headers = {
      headers: {'Authorization': apiToken, 'User-Email': userEmail}
    };

    if (page > 1) {
      dispatch(requestMoreUserList());
    } else {
      dispatch(requestUserList());
    }
    return axios.get(url, headers).then((response) => {
      dispatch(receiveUserList(response.data));
    }).catch(error => handleAPIError(error));
  }
}