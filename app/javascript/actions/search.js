import axios from 'axios';
import {serverDomain} from '../env';
import { handleAPIError }  from '../util/helpers';

function requestSearch() {
  return {
    type: 'REQUEST_SEARCH',
  };
}

function receiveResults(json) {
  return {
    type: 'RECEIVED_SEARCH_RESULTS',
    posts: json.posts,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

export function search(query, sortBy) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/search`;

    dispatch(requestSearch());
    return axios.post(url, {query, sortBy}, headers).then((response) => {
      dispatch(receiveResults(response.data));
    }).catch(error => handleAPIError(error, dispatch));
  }
}