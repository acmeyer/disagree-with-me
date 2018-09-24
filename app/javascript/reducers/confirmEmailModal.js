
const initial = {
  isVisible: false,
  view: 'signup',
  email: null,
};

export function confirmEmailModalReducer(state = initial, action) {
  if (action.type === 'HIDE_CONFIRM_EMAIL_MODAL') {
    return {
      ...state,
      isVisible: false,
    }
  }
  if (action.type === 'SHOW_CONFIRM_EMAIL_MODAL') {
    return {
      ...state, 
      isVisible: true,
      view: action.view || 'signup',
      email: action.email,
    };
  }

  return state;
}
