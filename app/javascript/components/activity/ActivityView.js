import React from 'react';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';
import ActivityCell from './ActivityCell';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  fetchNotifications,
} from '../../actions';

class ActivityView extends React.Component {
  componentWillMount() {
    let {list} = this.props.match.params;
    this.props.fetchNotifications(1, {list});
  }

  submenuLinks = () => {
    const currentUrl = this.props.match.url;
    return [
      {
        active: currentUrl === '/activity/unread' || currentUrl === '/activity',
        href: '/activity/unread',
        title: 'Unread',
        // icon: 'clock'
      },
      {
        active: currentUrl === '/activity/read',
        href: '/activity/read',
        title: 'Read',
        // icon: 'star'
      },
      {
        active: currentUrl === '/activity/all',
        href: '/activity/all',
        title: 'All',
        // icon: 'chart-line'
      },
    ]
  }

  renderNotification = (notification) => {
    return (
      <ActivityCell 
        key={notification.id} 
        user={this.props.user} 
        notification={notification}
      />
    );
  }

  render() {
    let content;

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      content = this.props.notifications.map(this.renderNotification);
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <PageSubmenu links={this.submenuLinks()} />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <PageHeader title="Activity" />
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
  };
}

function select(store) {
  return {
    isLoading: store.posts.loading,
    user: store.user,
    notifications: store.notifications.list,
  };
}

export default withRouter(connect(select, actions)(ActivityView));
