import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  list: [],
};

export function searchReducer(state = initial, action) {
  if (action.type === 'REQUEST_SEARCH') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'RECEIVED_SEARCH_RESULTS') {
    return {
      ...state, 
      loading: false,
      list: action.posts,
    };
  }

  return state;
}
