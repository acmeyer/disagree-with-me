import React from 'react';
import ActivityActions from './ActivityActions';
import {
  withRouter
} from 'react-router-dom';
import moment from  'moment';

class ActivityCell extends React.Component {
  render() {
    return (
      <div className="card cell notification-cell mb-2">
        <div className="p-3">
          {this.props.notification.message}
          <div className="small time-ago text-muted">{moment(this.props.notification.created_at).fromNow()}</div>
          <ActivityActions 
            notification={this.props.notification} 
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ActivityCell);