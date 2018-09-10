import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  list: [],
  type: 'unread',
};

export function notificationsReducer(state = initial, action) {
  if (action.type === 'REQUEST_NOTIFICATIONS') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === 'RECEIVED_NOTIFICATIONS') {
    return {
      ...state, 
      loading: false,
      list: action.notifications,
      type: action.list,
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
