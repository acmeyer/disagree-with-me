import axios from 'axios';
import {serverDomain} from '../env';
import { handleAPIError } from '../util/helpers';

function requestPosts() {
  return {
    type: 'REQUEST_POSTS',
  };
}

function requestMorePosts() {
  return {
    type: 'REQUEST_MORE_POSTS',
  };
}

function receivePosts(json) {
  return {
    type: 'RECEIVED_POSTS',
    posts: json.posts,
    moreResults: json.more_results,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
  };
}

function receivePost(json) {
  return {
    type: 'RECEIVED_POST',
    post: json,
  };
}

function toggleUpvote(post) {
  const updatedPost = {
    ...post,
    upvoted: !post.upvoted,
    upvotes_count: post.upvoted ? post.upvotes_count - 1 : post.upvotes_count + 1,
  }
  return {
    type: 'TOGGLE_POST_UPVOTE',
    post: updatedPost,
  }
}

function toggleBookmark(post) {
  const updatedPost = {
    ...post,
    bookmarked: !post.bookmarked,
  }
  return {
    type: 'TOGGLE_POST_BOOKMARK',
    post: updatedPost,
  }
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
    let url = `${serverDomain}/posts?page=${page}`;

    if (options.latest) {
      url = url + '&latest=true';
    } else if (options.popular) {
      url = url + '&popular=true';
    } else {
      url = url + '&latest=true';
    }

    if (page > 1) {
      dispatch(requestMorePosts());
    } else {
      dispatch(requestPosts());
    }

    return axios.get(url, headers).then((response) => {
      dispatch(receivePosts(response.data));
    }).catch(error => handleAPIError(error, dispatch));
  }
}

export function togglePostUpvote(post) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/posts/${post.id}/toggle_upvote`;

    // Dispatch the action to toggle so it happens instantly in the UI
    dispatch(toggleUpvote(post));

    return axios.post(url, {}, headers).then((response) => {
      dispatch(receivePost(response.data));
    }).catch(error => handleAPIError(error, dispatch));
  }
}

export function togglePostBookmark(post) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/posts/${post.id}/toggle_bookmark`;

    // Dispatch the action to toggle so it happens instantly in the UI
    dispatch(toggleBookmark(post));
    
    return axios.post(url, {}, headers).then((response) => {
      dispatch(receivePost(response.data));
    }).catch(error => handleAPIError(error, dispatch));
  }
}

export function createPost(content) {
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
    let url = `${serverDomain}/posts`;

    return axios.post(url, {content}, headers).then((response) => {
      dispatch(receivePost(response.data));
      return response.data.id;
    }).catch(error => handleAPIError(error, dispatch));
  }
}