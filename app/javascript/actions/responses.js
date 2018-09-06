import axios from 'axios';
import {serverDomain} from '../env';

function receiveResponse(json) {
  return {
    type: 'RECEIVED_RESPONSE',
    response: json,
  };
}

function toggleUpvote(response) {
  const updatedResponse = {
    ...response,
    upvoted: !response.upvoted,
    upvotes_count: response.upvoted ? response.upvotes_count - 1 : response.upvotes_count + 1,
  }
  return {
    type: 'TOGGLE_RESPONSE_UPVOTE',
    response: updatedResponse,
  }
}

function thank(response) {
  const updatedResponse = {
    ...response,
    author_thanked: true,
  }
  return {
    type: 'THANKED_RESPONSE',
    response: updatedResponse,
  }
}

export function createResponse(content, postId) {
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
    let url = `${serverDomain}/posts/${postId}/responses`;

    return axios.post(url, {content}, headers).then((response) => {
      dispatch(receiveResponse(response.data));
    }).catch(error => console.log(error));
  }
}

export function toggleResponseUpvote(response) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/posts/${response.post_id}/responses/${response.id}/toggle_upvote`;

    // Dispatch the action to toggle so it happens instantly in the UI
    dispatch(toggleUpvote(response));

    return axios.post(url, {}, headers).then((response) => {
      dispatch(receiveResponse(response.data));
    }).catch(error => console.log(error));
  }
}

export function thankResponse(response) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/posts/${response.post_id}/responses/${response.id}/thank`;

    // Dispatch the action so it happens instantly in the UI
    dispatch(thank(response));

    return axios.post(url, {}, headers).then((response) => {
      dispatch(receiveResponse(response.data));
    }).catch(error => console.log(error));
  }
}