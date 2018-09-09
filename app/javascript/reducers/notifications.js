import {
  replaceById,
} from '../util/helpers';

const initial = {
  loading: false,
  list: [],
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
    };
  }

  return state;
}
