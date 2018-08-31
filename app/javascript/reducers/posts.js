import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  list: [],
};

export function postsReducer(state = initial, action) {
  if (action.type === 'REQUEST_POSTS') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'RECEIVE_POSTS') {
    return {
      ...state, 
      loading: false,
      list: action.posts,
    };
  }
  if (action.type === 'RECEIVE_POST' || action.type === 'TOGGLE_POST_UPVOTE' || action.type === 'TOGGLE_POST_BOOKMARK') {
    return {
      ...state,
      list: replaceById(state.list, action.post),
    }
  }

  return state;
}
