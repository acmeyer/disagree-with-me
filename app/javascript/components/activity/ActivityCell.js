import React from 'react';
import ActivityActions from './ActivityActions';
import {
  withRouter
} from 'react-router-dom';
import moment from  'moment';

class ActivityCell extends React.Component {
  render() {
    let actionable = (this.props.notification.post || this.props.notification.response);
    return (
      <div className={`card cell notification-cell mb-2 ${actionable ? 'actionable' : ''} ${this.props.notification.status}`} onClick={actionable ? () => this.props.handleShowNotification(this.props.notification) : null}>
        <div className="d-flex">
          <div className="content d-flex flex-column p-3 flex-fill">
            {this.props.notification.message}
            <div className="small time-ago text-muted">{moment(this.props.notification.created_at).fromNow()}</div>
          </div>
          <ActivityActions 
            notification={this.props.notification} 
            handleDelete={this.props.handleDeleteNotification}
            handleMarkRead={this.props.handleMarkNotificationRead}
            handleMarkUnread={this.props.handleMarkNotificationUnread}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ActivityCell);