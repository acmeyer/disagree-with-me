import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  loadingMore: false,
  list: [],
  moreResults: false,
  page: 1,
  totalPages: null,
  totalEntries: null,
  selectedTopic: {},
};

const defaultTopics = [
  {
    id: 'latest',
    title: 'Latest',
  },
  {
    id: 'popular',
    title: 'Popular',
  },
];

export function topicsReducer(state = initial, action) {
  if (action.type === 'REQUEST_TOPICS') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'API_ERROR') {
    return {
      ...state,
      loading: false,
    }
  }
  if (action.type === 'REQUEST_MORE_TOPICS') {
    return {
      ...state,
      loadingMore: true,
    }
  }
  if (action.type === 'RECEIVED_TOPICS') {
    const updatedList = action.page !== 1
      ? _.concat(state.list, action.topics)
      : _.orderBy(action.topics, ['posts_count'], ['desc']);
    return {
      ...state, 
      loading: false,
      loadingMore: false,
      list: [
        ...defaultTopics,
        ...updatedList
      ],
      moreResults: action.moreResults,
      page: action.page,
      totalPages: action.totalPages,
      totalEntries: action.totalEntries,
    };
  }
  if (action.type === 'RECEIVED_TOPIC') {
    return {
      ...state,
      list: replaceById(state.list, action.topic),
    }
  }
  if (action.type === 'SHOW_TOPIC') {
    return {
      ...state,
      selectedTopic: action.topic,
    }
  }

  return state;
}
