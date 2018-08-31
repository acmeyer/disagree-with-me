import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  list: [],
};

export function userListReducer(state = initial, action) {
  if (action.type === 'REQUEST_USER_LIST') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'RECEIVE_USER_LIST') {
    return {
      ...state, 
      loading: false,
      list: action.data,
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
