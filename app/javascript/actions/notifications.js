import axios from 'axios';
import {serverDomain} from '../env';

function requestNotifications() {
  return {
    type: 'REQUEST_NOTIFICATIONS',
  };
}

function receiveNotifications(json, list) {
  return {
    type: 'RECEIVED_NOTIFICATIONS',
    notifications: json.notifications,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
    list,
  };
}

export function fetchNotifications(page = 1, options = {}) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    let url = `${serverDomain}/notifications?page=${page}`;
    if (options.list === 'read') {
      url = url + '&read=true';
    } else if (options.list === 'all') {
      url = url + '&all=true';
    } else {
      url = url + '&unread=true';
    }

    dispatch(requestNotifications());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveNotifications(response.data, options.list));
    }).catch(error => console.log(error));
  }
}

export function notificationAction(notification, action) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/notifications/${notification.id}/${action}`;

    return axios.post(url, {}, headers).then((response) => {
      dispatch({
        type: 'NOTIFICATION_ACTION',
        notification: response.data,
        notification_action: action,
      });
    }).catch(error => console.log(error));
  }
}

export function markAllNotificationsRead() {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/notifications/mark_all_read`;

    return axios.post(url, {}, headers).then((response) => {
      dispatch({
        type: 'MARK_ALL_NOTIFICATIONS_READ',
      });
    }).catch(error => console.log(error));
  }
}