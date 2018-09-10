import React from 'react';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';
import LoadingView from '../common/LoadingView';
import ActivityCell from './ActivityCell';
import {withRouter} from 'react-router-dom';
import { Button, NonIdealState } from "@blueprintjs/core";
import {connect} from 'react-redux';
import {
  fetchNotifications,
  notificationAction,
  markAllNotificationsRead,
} from '../../actions';

class ActivityView extends React.Component {
  componentDidMount() {
    let {list} = this.props.match.params;
    this.props.fetchNotifications(1, {list});
  }

  submenuLinks = () => {
    let {list} = this.props.match.params;
    return [
      {
        active: list === 'unread',
        href: '/activity/unread',
        title: 'Unread',
      },
      {
        active: list === 'read',
        href: '/activity/read',
        title: 'Read',
      },
      {
        active: list === 'all',
        href: '/activity/all',
        title: 'All',
      },
    ]
  }

  handleShowNotification = (notification) => {
    this.handleMarkNotificationRead(notification);
    if (notification.post) {
      this.props.history.push(`/conversations/${notification.post.id}`);
    } else {
      this.props.history.push(`/conversations/${notification.response.post_id}`);
    }
  }

  handleDeleteNotification = (notification) => {
    this.props.notificationAction(notification, 'delete');
  }

  handleMarkNotificationRead = (notification) => {
    this.props.notificationAction(notification, 'mark_read');
  } 

  handleMarkNotificationUnread = (notification) => {
    this.props.notificationAction(notification, 'mark_unread');
  }

  handleMarkAllRead = () => {
    this.props.markAllNotificationsRead();
  }

  renderNotification = (notification) => {
    return (
      <ActivityCell 
        key={notification.id} 
        user={this.props.user} 
        notification={notification}
        handleShowNotification={this.handleShowNotification}
        handleDeleteNotification={this.handleDeleteNotification}
        handleMarkNotificationRead={this.handleMarkNotificationRead}
        handleMarkNotificationUnread={this.handleMarkNotificationUnread}
      />
    );
  }

  renderMarkAllRead = () => {
    let {list} = this.props.match.params;
    let {notifications} = this.props;
    if (list === 'unread' && notifications.length > 0) {
      return (
        <Button icon="tick" text="Mark All Read" onClick={this.handleMarkAllRead} />
      );
    }
  }

  render() {
    let content;

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      if (this.props.notifications.length > 0) {
        content = this.props.notifications.map(this.renderNotification);
      } else {
        let message, description, icon;
        let {list} = this.props.match.params;
        if (list === 'read') {
          icon = "envelope";
          message = "No read messages";
          description = "Your read messages will appear here.";
        } else if (list === 'unread') {
          icon = "tick";
          message = "No unread messages";
          description = "New unread messages will appear here.";
        } else {
          icon = "envelope";
          message = "No messages";
          description = "All your messages will appear here.";
        }
        content = (
          <NonIdealState
            icon={icon}
            title={message}
            description={description}
          />
        );
      }
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <PageSubmenu links={this.submenuLinks()} />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <PageHeader title="Activity" headerAction={this.renderMarkAllRead()} />
              <PageList>
                {content}
              </PageList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function actions(dispatch) {
  return {
    fetchNotifications: (page, options) => { dispatch(fetchNotifications(page, options)) },
    notificationAction: (notification, action) => { dispatch(notificationAction(notification, action)) },
    markAllNotificationsRead: (notification) => { dispatch(markAllNotificationsRead(notification)) },
  };
}

function select(store) {
  return {
    isLoading: store.notifications.loading,
    user: store.user,
    notifications: store.notifications.list,
  };
}

export default withRouter(connect(select, actions)(ActivityView));
