
const initial = {
  isVisible: false,
  loading: false,
  post: null,
  responses: {
    loading: false,
    list: [],
    page: null,
    totalPages: null,
    totalEntries: null,
  },
};

export function conversationReducer(state = initial, action) {
  if (action.type === 'HIDE_CONVERSATION_MODAL') {
    return {
      ...state,
      isVisible: false,
    }
  }
  if (action.type === 'SHOW_CONVERSATION_MODAL') {
    return {
      ...state, 
      isVisible: true,
    };
  }
  if (action.type === 'REQUEST_CONVERSATION_POST') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'REQUEST_CONVERSATION_RESPONSES') {
    return {
      ...state,
      responses: {
        ...state.responses,
        loading: true,
      }
    }
  }
  if (action.type === 'RECEIVE_CONVERSATION_POST') {
    return {
      ...state,
      loading: false,
      post: action.post,
    }
  }
  if (action.type === 'RECEIVE_CONVERSATION_RESPONSES') {
    return {
      ...state,
      responses: {
        ...state.responses,
        loading: false,
        list: action.responses,
      }
    }
  }

  return state;
}
