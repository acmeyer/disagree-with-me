import axios from 'axios';
import {serverDomain} from '../env';
import { handleAPIError } from '../util/helpers';

function requestTopics() {
  return {
    type: 'REQUEST_TOPICS',
  };
}

function requestMoreTopics() {
  return {
    type: 'REQUEST_MORE_TOPICS',
  };
}

function receiveTopics(json) {
  return {
    type: 'RECEIVED_TOPICS',
    topics: json.topics,
    moreResults: json.more_results,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

function receiveTopic(json) {
  return {
    type: 'RECEIVED_TOPIC',
    topic: json,
  };
}

export function fetchTopics(page = 1) {
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
    let url = `${serverDomain}/topics?page=${page}`;

    if (page > 1) {
      dispatch(requestMoreTopics());
    } else {
      dispatch(requestTopics());
    }

    return axios.get(url, headers).then((response) => {
      dispatch(receiveTopics(response.data));
    }).catch(error => handleAPIError(error, dispatch));
  }
}

export function createTopic(content) {
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
    let url = `${serverDomain}/topics`;

    return axios.post(url, {content}, headers).then((response) => {
      dispatch(receiveTopic(response.data));
      return response.data.id;
    }).catch(error => handleAPIError(error, dispatch));
  }
}