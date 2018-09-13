import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  loadingMore: false,
  list: [],
  type: 'unread',
  moreResults: false,
  page: 1,
  totalPages: null,
  totalEntries: null,
};

export function notificationsReducer(state = initial, action) {
  if (action.type === 'REQUEST_NOTIFICATIONS') {
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
  if (action.type === 'REQUEST_MORE_NOTIFICATIONS') {
    return {
      ...state,
      loadingMore: true,
    }
  }
  if (action.type === 'RECEIVED_NOTIFICATIONS') {
    const updatedList = action.page !== 1 && (state.type === action.list)
      ? _.concat(state.list, action.notifications)
      : action.notifications;
    return {
      ...state, 
      loading: false,
      list: updatedList,
      type: action.list,
      moreResults: action.moreResults,
      page: action.page,
      totalPages: action.totalPages,
      totalEntries: action.totalEntries,
    };
  }
  if (action.type === 'MARK_ALL_NOTIFICATIONS_READ') {
    const updatedList = state.type === 'unread' ? [] : state.list;
    return {
      ...state,
      list: updatedList,
    }
  }
  if (action.type === 'NOTIFICATION_ACTION') {
    let updatedList = state.list;
    if (state.type === 'unread') {
      if (action.notification_action === 'mark_read' || 'delete') {
        updatedList = state.list.filter(n => n.id !== action.notification.id);
      } else {
        updatedList = replaceById(state.list, action.notification);
      }
    } else if (state.type === 'read') {
      if (action.notification_action === 'mark_unread' || 'delete') {
        updatedList = state.list.filter(n => n.id !== action.notification.id);
      } else {
        updatedList = replaceById(state.list, action.notification);
      }
    } else {
      if (action.notification_action === 'delete') {
        updatedList = state.list.filter(n => n.id === action.notification.id);
      } else {
        updatedList = replaceById(state.list, action.notification);
      }
    }
    return {
      ...state,
      list: updatedList,
    };
  }
  if (action.type === 'RECEIVED_NOTIFICATION') {
    return {
      ...state, 
      loading: false,
      list: replaceById(state.list, action.notification),
    };
  }

  return state;
}
