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
    // const apiToken = getState().user.apiToken;
    let url = `${serverDomain}posts?page=${page}`;

    if (options.latest) {
      url = url + '&latest=true';
    } else if (options.popular) {
      url = url + '&popular=true';
    }

    dispatch(requestPosts());
    return axios.get(url).then((response) => {
      dispatch(receivePosts(response.data));
    }).catch(error => console.log(error));
  }
}