import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  list_type: 'posts',
  list: [],
};

export function userListReducer(state = initial, action) {
  if (action.type === 'REQUEST_USER_LIST') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'RECEIVED_USER_LIST') {
    return {
      ...state, 
      loading: false,
      list: action.data,
      list_type: action.list_type,
    };
  }
  if (action.type === 'RECEIVED_POST' || action.type === 'TOGGLE_POST_UPVOTE' || action.type === 'TOGGLE_POST_BOOKMARK') {
    if (state.list_type === 'posts') {
      return {
        ...state,
        list: replaceById(state.list, action.post),
      }
    }
  }
  if (action.type === 'RECEIVED_RESPONSE' || action.type === 'TOGGLE_RESPONSE_UPVOTE' || action.type === 'THANKED_RESPONSE') {
    if (state.list_type === 'responses') {
      return {
        ...state,
        list: replaceById(state.list, action.response),
      }
    }
  }

  return state;
}
