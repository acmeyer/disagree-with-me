
const initial = {
  isVisible: false,
};

export function composePostModalReducer(state = initial, action) {
  if (action.type === 'HIDE_COMPOSE_POST_MODAL') {
    return {
      ...state,
      isVisible: false,
    }
  }
  if (action.type === 'SHOW_COMPOSE_POST_MODAL') {
    return {
      ...state, 
      isVisible: true,
    };
  }

  return state;
}
