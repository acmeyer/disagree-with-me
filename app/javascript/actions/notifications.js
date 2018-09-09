import axios from 'axios';
import {serverDomain} from '../env';

function requestNotifications() {
  return {
    type: 'REQUEST_NOTIFICATIONS',
  };
}

function receiveNotifications(json) {
  return {
    type: 'RECEIVED_NOTIFICATIONS',
    notifications: json.notifications,
    page: json.page,
    totalPages: json.total_pages,
    totalEntries: json.total_entries,
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
    if (options.read) {
      url = url + '&read=true';
    } else if (options.all) {
      url = url + '&all=true';
    } else {
      url = url + '&unread=true';
    }

    dispatch(requestNotifications());
    return axios.get(url, headers).then((response) => {
      dispatch(receiveNotifications(response.data));
    }).catch(error => console.log(error));
  }
}