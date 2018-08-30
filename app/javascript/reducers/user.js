
const initialState = {
  loggedIn: false,
  loading: false,
};

export function userReducer(state = initialState, action) {
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
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }

  return state;
}
