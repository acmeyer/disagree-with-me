
const initialState = {
  loggedIn: false,
  loading: false,
  seenWelcomeMessage: false,
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
  if (action.type === 'SEEN_WELCOME_MESSAGE') {
    return {
      ...state,
      seenWelcomeMessage: true,
    }
  }
  if (action.type === 'SIGNED_UP') {
    return {
      ...state,
      loggedIn: true,
      ...action.user,
    }
  }
  if (action.type === 'LOGGED_OUT') {
    return {
      loggedIn: false,
      loading: false,
      seenWelcomeMessage: state.seenWelcomeMessage,
    }
  }

  return state;
}
