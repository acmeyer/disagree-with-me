import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  loadingMore: false,
  list_type: 'posts',
  list: [],
  moreResults: false,
  page: 1,
  totalPages: null,
  totalEntries: null,
};

export function userListReducer(state = initial, action) {
  if (action.type === 'REQUEST_USER_LIST') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'API_ERROR') {
    return {
      ...state,
      loading: false,
    }
  }
  if (action.type === 'REQUEST_MORE_USER_LIST') {
    return {
      ...state,
      loadingMore: true,
    }
  }
  if (action.type === 'RECEIVED_USER_LIST') {
    const updatedList = action.page !== 1 && (state.list_type === action.list_type)
      ? _.concat(state.list, action.data)
      : action.data;
    return {
      ...state, 
      loading: false,
      loadingMore: false,
      list: updatedList,
      list_type: action.list_type,
      moreResults: action.moreResults,
      page: action.page,
      totalPages: action.totalPages,
      totalEntries: action.totalEntries,
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
