
function track(action) {
  switch (action.type) {
    case 'LOGGED_IN':
      mixpanel.identify(action.user.id.toString());
      mixpanel.people.set({
        '$email': action.user.email
      });
      mixpanel.track('Logged in', {method: action.method});
      break;
    case 'RESET_PASSWORD_SENT':
      mixpanel.track('Reset Password Sent', {email: action.email});
      break;
    case 'LOGGED_OUT':
      mixpanel.track('Logged out');
      break;
    case 'SHOW_COMPOSE_POST_MODAL':
      mixpanel.track('Viewed Compose Post Modal');
      break;
    case 'SHOW_REPORT_MODAL':
      mixpanel.track('Viewed Report Post Modal', {object_id: action.data.id, type: action.reporting_type});
      break;
    case 'MARK_ALL_NOTIFICATIONS_READ':
      mixpanel.track('Marked All Notifications Read');
      break;
    case 'THANKED_RESPONSE':
      mixpanel.track('Thanked Response', {response_id: action.response.id});
      break;
  }
}

module.exports = track;