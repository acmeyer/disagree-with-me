import React from 'react';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';
import LoadingView from '../common/LoadingView';
import ActivityCell from './ActivityCell';
import {withRouter, Redirect} from 'react-router-dom';
import { Button, NonIdealState } from "@blueprintjs/core";
import {connect} from 'react-redux';
import {
  fetchNotifications,
  notificationAction,
  markAllNotificationsRead,
} from '../../actions';

const activityLists = [
  'unread',
  'read',
  'all'
];

class ActivityView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markAllLoading: false,
    };
  }

  componentDidMount() {
    let {list} = this.props.match.params;
    if (activityLists.includes(list)) {
      this.props.dispatch(fetchNotifications(1, {list}));
      mixpanel.track('Viewed Activity Page', {list});
    }
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

  handleMarkNotificationRead = (notification) => {
    this.props.dispatch(notificationAction(notification, 'mark_read'));
    mixpanel.track('Marked Notification Read', {notification_id: notification.id});
  } 


  handleShowNotification = (notification) => {
    this.handleMarkNotificationRead(notification);
    if (notification.post) {
      this.props.history.push(`/conversations/${notification.post.id}`);
    } else {
      this.props.history.push(`/conversations/${notification.response.post_id}`);
    }
  }

  handleMarkAllRead = () => {
    this.setState({markAllLoading: true});
    this.props.dispatch(markAllNotificationsRead()).then(() => {
      this.setState({markAllLoading: false});
    }).catch(err => this.setState({markAllLoading: false}));
  }

  renderNotification = (notification) => {
    return (
      <ActivityCell 
        key={notification.id} 
        user={this.props.user} 
        notification={notification}
        handleShowNotification={this.handleShowNotification}
      />
    );
  }

  renderMarkAllRead = () => {
    let {list} = this.props.match.params;
    let {notifications} = this.props;
    if (list === 'unread' && notifications.length > 0) {
      return (
        <Button disabled={this.state.markAllLoading} loading={this.state.markAllLoading} icon="tick" text="Mark All Read" onClick={this.handleMarkAllRead} />
      );
    }
  }

  handleLoadMoreNotifications = () => {
    const page = this.props.page + 1;
    let {list} = this.props.match.params;
    this.props.dispatch(fetchNotifications(page, {list}));
    mixpanel.track('Load More Posts', {page: 'activity', list: list});
  }

  render() {
    let content, loadMore;

    let {list} = this.props.match.params;
    if (!activityLists.includes(list)) {
      return (
        <Redirect
          to={{pathname: "/activity/unread"}}
        />
      );
    }

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      if (this.props.notifications.length > 0) {
        content = this.props.notifications.map(this.renderNotification);
        if (this.props.moreResults) {
          loadMore = (
            <div className="load-more text-center m-3">
              <Button 
                onClick={this.handleLoadMoreNotifications}
                loading={this.props.loadingMore}
                text="Load More"
              />
            </div>
          )
        }
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
                {loadMore}
              </PageList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function select(store) {
  return {
    isLoading: store.notifications.loading,
    user: store.user,
    notifications: store.notifications.list,
    moreResults: store.notifications.moreResults,
    page: store.notifications.page,
    loadingMore: store.notifications.loadingMore,
  };
}

export default withRouter(connect(select)(ActivityView));
