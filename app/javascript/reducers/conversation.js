import {
  replaceIfObj,
  appendOrReplaceById,
} from '../util/helpers';

const initial = {
  isVisible: false,
  loading: false,
  post: null,
  focusResponse: false,
  responses: {
    loading: false,
    list: [],
    filters: {
      thanked_only: true,
    },
    page: null,
    totalPages: null,
    totalEntries: null,
  },
};

export function conversationReducer(state = initial, action) {
  if (action.type === 'HIDE_CONVERSATION_MODAL') {
    return initial;
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
  if (action.type === 'RECEIVED_CONVERSATION_POST') {
    return {
      ...state,
      loading: false,
      post: action.post,
    }
  }
  if (action.type === 'RECEIVED_CONVERSATION_RESPONSES') {
    return {
      ...state,
      responses: {
        ...state.responses,
        loading: false,
        list: action.responses,
      }
    }
  }
  if (action.type === 'RECEIVED_POST' || action.type === 'TOGGLE_POST_UPVOTE' || action.type === 'TOGGLE_POST_BOOKMARK') {
    return {
      ...state,
      post: replaceIfObj(state.post, action.post),
    }
  }
  if (action.type === 'RECEIVED_RESPONSE' || action.type === 'TOGGLE_RESPONSE_UPVOTE' || action.type === 'THANKED_RESPONSE') {
    return {
      ...state,
      responses: {
        ...state.responses,
        loading: false,
        list: appendOrReplaceById(state.responses.list, action.response),
      }
    }
  }
  if (action.type === 'UPDATE_RESPONSES_FILTER') {
    return {
      ...state,
      responses: {
        ...state.responses,
        filters: {
          ...state.responses.filters,
          thanked_only: action.thanked_only,
        }
      }
    }
  }

  return state;
}
