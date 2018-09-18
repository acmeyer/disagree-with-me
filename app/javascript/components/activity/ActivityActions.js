import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import { 
  Tooltip,
  Spinner,
} from "@blueprintjs/core";
import {connect} from 'react-redux';
import {
  notificationAction,
} from '../../actions';

class ActivityActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleReadLoading: false,
      deleteLoading: false,
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  markAsRead = (e) => {
    e.stopPropagation();
    let {notification} = this.props;
    this.setState({toggleReadLoading: true});
    this.props.dispatch(notificationAction(notification, 'mark_read')).then(() => {
      if (this.mounted) {this.setState({toggleReadLoading: false});}
    }).catch(err => this.setState({toggleReadLoading: false}));

    mixpanel.track('Marked Notification Read', {notification_id: notification.id});
  }

  markAsUnread = (e) => {
    e.stopPropagation();
    let {notification} = this.props;
    this.setState({toggleReadLoading: true});
    this.props.dispatch(notificationAction(notification, 'mark_unread')).then(() => {
      if (this.mounted) {this.setState({toggleReadLoading: false});}
    }).catch(err => this.setState({toggleReadLoading: false}));

    mixpanel.track('Marked Notification Unread', {notification_id: notification.id});
  }

  delete = (e) => {
    e.stopPropagation();
    let {notification} = this.props;
    this.setState({deleteLoading: true});
    this.props.dispatch(notificationAction(notification, 'delete')).then(() => {
      if (this.mounted) {this.setState({deleteLoading: false});}
    }).catch(err => this.setState({deleteLoading: false}));

    mixpanel.track('Deleted Notification', {notification_id: notification.id});
  }

  render() {
    let toggleRead;
    if (this.props.notification.status === 'unread') {
      toggleRead = (
        <div className="action px-3" onClick={(e) => this.markAsRead(e)}>
          {this.state.toggleReadLoading ? <Spinner size={16} /> : 
            <Tooltip content="Mark as Read" position="top">
              <span className={`action-icon`}><i className={`fas fa-check`} /></span>
            </Tooltip>
          }
        </div>
      );
    } else {
      toggleRead = (
        <div className="action px-3" onClick={(e) => this.markAsUnread(e)}>
          {this.state.toggleReadLoading ? <Spinner size={16}  /> : 
            <Tooltip content="Mark as Unread" position="top">
              <span className={`action-icon`}><i className={`far fa-envelope-open`} /></span>
            </Tooltip>
          }
        </div>
      );
    }
    return (
      <div className="activity-actions border-left d-flex flex-column justify-content-around">
        {toggleRead}
        <div className="action px-3" onClick={(e) => this.delete(e)}>
          {this.state.deleteLoading ? <Spinner size={16} /> : 
            <Tooltip content="Delete" position="top">
              <span className={`action-icon`}><i className={`far fa-trash-alt`} /></span>
            </Tooltip>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(ActivityActions));