
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

  return state;
}
