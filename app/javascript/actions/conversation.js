import axios from 'axios';
import {serverDomain} from '../env';

function requestConversationPost() {
  return {
    type: 'REQUEST_CONVERSATION_POST',
  }
}

function receiveConversationPost(json) {
  return {
    type: 'RECEIVED_CONVERSATION_POST',
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
    type: 'RECEIVED_CONVERSATION_RESPONSES',
    responses: json.responses,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

function updateFilters(thanked_only) {
  return {
    type: 'UPDATE_RESPONSES_FILTER',
    thanked_only,
  }
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

export function fetchConversationPost(postId) {
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
    let url = `${serverDomain}/posts/${postId}`;

    dispatch(requestConversationPost());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveConversationPost(response.data));
    }).catch(error => console.log(error));
  }
}

export function fetchConversationResponses(postId, page = 1) {
  return (dispatch, getState) => {
    let headers = {headers: {}};
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const filters = getState().conversation.responses.filters;
    if (apiToken) {
      headers.headers = {
        'Authorization': apiToken,
        'User-Email': userEmail,
      };
    }
    let url = `${serverDomain}/posts/${postId}/responses?page=${page}&thanked_only=${filters.thanked_only}`;

    dispatch(requestConversationResponses());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveConversationResponses(response.data));
    }).catch(error => console.log(error));
  }
}

export function showConversation(postId) {
  return (dispatch) => {
    dispatch(fetchConversationPost(postId));
    dispatch(fetchConversationResponses(postId));
    dispatch(showConversationModal());
  }
}

export function changeResponsesFilter(thanked_only, postId) {
  return (dispatch) => {
    dispatch(updateFilters(thanked_only)); 
    dispatch(fetchConversationResponses(postId));
  }
}