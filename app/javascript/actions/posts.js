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

export function fetchPosts() {
  return (dispatch, getState) => {
    // const apiToken = getState().user.apiToken;
    const url = `${serverDomain}posts`;

    dispatch(requestPosts());
    return axios.get(url).then((response) => {
      dispatch(receivePosts(response.data));
    }).catch(error => console.log(error));
  }
}