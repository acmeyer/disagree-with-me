import React from 'react';
import PageSubmenu from '../common/PageSubmenu';
import PageHeader from '../common/PageHeader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Switch } from "@blueprintjs/core";

import {
  updateUserNotificationSettings,
} from '../../actions';

class UserSettingsView extends React.Component {
  componentDidMount() {
    mixpanel.track('Viewed User Notification Settings Page');
  }

  handleNotificationSettingChanged = (field, value) => {
    this.props.dispatch(updateUserNotificationSettings(field, value));
  }

  submenuLinks = () => {
    return [
      {
        active: false,
        href: '/me/posts',
        title: 'Posts'
      },
      {
        active: false,
        href: '/me/responses',
        title: 'Responses'
      },
      {
        active: false,
        href: '/me/thanks',
        title: 'Thanks'
      },
      {
        active: false,
        href: '/me/post-upvotes',
        title: 'Post Upvotes'
      },
      {
        active: false,
        href: '/me/response-upvotes',
        title: 'Response Upvotes'
      },
      {
        active: true,
        href: '/notification_settings',
        title: 'Notification Settings'
      },
    ]
  }

  render() {
    let {notifications_settings} = this.props.user;
    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <PageSubmenu links={this.submenuLinks()} />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <PageHeader title="Notification Settings" />
              <div className="card p-3">
                <h6>Receive email notifications:</h6>
                <Switch alignIndicator="left" large checked={notifications_settings.new_response_email} label="When someone responds to one of your posts" onChange={e => this.handleNotificationSettingChanged('new_response_email', e.target.checked)} />
                <Switch alignIndicator="left" large checked={notifications_settings.new_upvote_email} label="When someone upvotes one of your posts or responses" onChange={e => this.handleNotificationSettingChanged('new_upvote_email', e.target.checked)} />
                <Switch alignIndicator="left" large checked={notifications_settings.response_thanked_email} label="When one of your responses is thanked" onChange={e => this.handleNotificationSettingChanged('response_thanked_email', e.target.checked)} />
                <Switch alignIndicator="left" large checked={notifications_settings.new_thanked_email} label="When there's a new thanked response to a conversation you've bookmarked" onChange={e => this.handleNotificationSettingChanged('new_thanked_email', e.target.checked)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function select(store) {
  return {
    isLoading: store.user.loading,
    user: store.user,
  };
}

export default withRouter(connect(select)(UserSettingsView));
