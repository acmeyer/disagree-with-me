import axios from 'axios';
import {serverDomain} from '../env';

function requestConversationPost() {
  return {
    type: 'REQUEST_CONVERSATION_POST',
  }
}

function receiveConversationPost(json) {
  return {
    type: 'RECEIVE_CONVERSATION_POST',
    post: json,
  }
}

function requestConversationResponses() {
  return {
    type: 'REQUEST_CONVERSATION_RESPONSES',
  }
}

function receiveConversationResponses(json) {
  return {
    type: 'RECEIVE_CONVERSATION_RESPONSES',
    responses: json.responses,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

export function showConversationModal() {
  return {
    type: 'SHOW_CONVERSATION_MODAL',
  };
}

export function hideConversationModal() {
  return {
    type: 'HIDE_CONVERSATION_MODAL',
  };
}

export function fetchConversationPost(post) {
  return (dispatch, getState) => {
    let headers = {headers: {}};
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    if (apiToken) {
      headers.headers = {
        'Authorization': apiToken,
        'User-Email': userEmail,
      };
    }
    let url = `${serverDomain}/posts/${post.id}`;

    dispatch(requestConversationPost());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveConversationPost(response.data));
    }).catch(error => console.log(error));
  }
}

export function fetchConversationResponses(post, page = 1) {
  return (dispatch, getState) => {
    let headers = {headers: {}};
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    if (apiToken) {
      headers.headers = {
        'Authorization': apiToken,
        'User-Email': userEmail,
      };
    }
    let url = `${serverDomain}/posts/${post.id}/responses?page=${page}`;

    dispatch(requestConversationResponses());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveConversationResponses(response.data));
    }).catch(error => console.log(error));
  }
}

export function showConversation(post) {
  return (dispatch) => {
    dispatch(fetchConversationPost(post));
    dispatch(fetchConversationResponses(post));
    dispatch(showConversationModal());
  }
}