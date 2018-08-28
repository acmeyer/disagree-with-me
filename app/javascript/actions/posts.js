import axios from 'axios';
import {serverDomain} from '../env';

function requestPosts() {
  return {
    type: 'REQUEST_POSTS',
  };
}

function receivePosts(json) {
  return {
    type: 'RECEIVE_POSTS',
    posts: json.posts,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

export function fetchPosts(page = 1, options={}) {
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
    let url = `${serverDomain}posts?page=${page}`;

    if (options.latest) {
      url = url + '&latest=true';
    } else if (options.popular) {
      url = url + '&popular=true';
    }

    dispatch(requestPosts());
    return axios.get(url, headers).then((response) => {
      dispatch(receivePosts(response.data));
    }).catch(error => console.log(error));
  }
}