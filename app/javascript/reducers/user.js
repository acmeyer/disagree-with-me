
const initial = {
  loggedIn: false,
  loading: false,
};

export function userReducer(state = initial, action) {
  if (action.type === 'RECEIVED_USER') {
    return {
      ...state, 
      loading: false,
      ...action.user
    };
  }
  if (action.type === 'LOGGED_IN') {
    return {
      ...state,
      loggedIn: true,
      ...action.user,
    }
  }

  return state;
}
