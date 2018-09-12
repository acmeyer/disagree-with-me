
const initial = {
  isVisible: false,
  view: 'login',
};

export function loginModalReducer(state = initial, action) {
  if (action.type === 'HIDE_LOGIN_MODAL') {
    return {
      ...state,
      isVisible: false,
    }
  }
  if (action.type === 'SHOW_LOGIN_MODAL') {
    return {
      ...state, 
      isVisible: true,
      view: action.view,
    };
  }

  return state;
}
