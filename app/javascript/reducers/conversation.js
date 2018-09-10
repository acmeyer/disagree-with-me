import {
  replaceIfObj,
  appendOrReplaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  post: null,
  responses: {
    loading: false,
    loadingMore: false,
    list: [],
    filters: {
      thanked_only: true,
    },
    moreResults: false,
    page: null,
    totalPages: null,
    totalEntries: null,
  },
};

export function conversationReducer(state = initial, action) {
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
  if (action.type === 'REQUEST_MORE_CONVERSATION_RESPONSES') {
    return {
      ...state,
      responses: {
        ...state.responses,
        loadingMore: true,
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
    const updatedList = action.page !== 1
    ? _.concat(state.responses.list, action.responses)
    : action.responses;
    return {
      ...state,
      responses: {
        ...state.responses,
        loading: false,
        loadingMore: false,
        list: updatedList,
        moreResults: action.moreResults,
        page: action.page,
        totalPages: action.totalPages,
        totalEntries: action.totalEntries,
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
    let updatedList = state.responses.list;
    if (state.responses.filters.thanked_only) {
      updatedList = action.response.author_thanked ? appendOrReplaceById(state.responses.list, action.response) : state.responses.list.filter(r => r.id !== action.response.id)
    } else {
      updatedList = appendOrReplaceById(state.responses.list, action.response);
    }
    return {
      ...state,
      responses: {
        ...state.responses,
        loading: false,
        list: updatedList,
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
