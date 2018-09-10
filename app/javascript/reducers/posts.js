import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  loadingMore: false,
  list: [],
  moreResults: false,
  page: 1,
  totalPages: null,
  totalEntries: null,
};

export function postsReducer(state = initial, action) {
  if (action.type === 'REQUEST_POSTS') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'REQUEST_MORE_POSTS') {
    return {
      ...state,
      loadingMore: true,
    }
  }
  if (action.type === 'RECEIVED_POSTS') {
    const updatedList = action.page !== 1
      ? _.concat(state.list, action.posts)
      : action.posts;
    return {
      ...state, 
      loading: false,
      loadingMore: false,
      list: updatedList,
      moreResults: action.moreResults,
      page: action.page,
      totalPages: action.totalPages,
      totalEntries: action.totalEntries,
    };
  }
  if (action.type === 'RECEIVED_POST' || action.type === 'TOGGLE_POST_UPVOTE' || action.type === 'TOGGLE_POST_BOOKMARK') {
    return {
      ...state,
      list: replaceById(state.list, action.post),
    }
  }

  return state;
}
