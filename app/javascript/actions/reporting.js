import axios from 'axios';
import {serverDomain} from '../env';

export function hideReportModal() {
  return {
    type: 'HIDE_REPORT_MODAL',
  };
}

export function showReportModal(data, type) {
  return {
    type: 'SHOW_REPORT_MODAL',
    reporting_type: type,
    data: data,
  };
}

export function reportContent(data, reason) {
  return (dispatch, getState) => {
    const userEmail = getState().user.email;
    const apiToken = getState().user.apiToken;
    const headers = {
      headers: {
        'Authorization': apiToken,
        'User-Email': userEmail,
      }
    };
    const url = `${serverDomain}/reports`;

    return axios.post(url, {data, reason}, headers).then(() => {
      // success!
    }).catch(error => console.log(error));
  }
}