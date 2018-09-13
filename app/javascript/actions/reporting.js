import axios from 'axios';
import {serverDomain} from '../env';
import { handleAPIError } from '../util/helpers';

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

export function reportContent(data, reason, description) {
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
    const report_data = {
      object_id: data.id, 
      reason,
      description,
      type: data.post_id ? 'response' : 'post'
    }

    return axios.post(url, report_data, headers).then(() => {
      // success!
    }).catch(error => handleAPIError(error, dispatch));
  }
}