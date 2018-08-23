
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

  return state;
}
