import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import LoginModal from './common/LoginModal';
import ReportModal from './common/ReportModal';
import ComposePostModal from './common/ComposePostModal';
import ConfirmEmailModal from './common/ConfirmEmailModal';
import HomeView from './home/HomeView';
import ConversationView from './conversations/ConversationView';
import UserView from './user/UserView';
import UserSettingsView from './user/UserSettingsView';
import ActivityView from './activity/ActivityView';
import AboutPage from './about/AboutPage';
import TermsPage from './terms/TermsPage';
import {connect} from 'react-redux';

import {
  fetchUser,
  fetchNotifications,
} from '../actions';
import BookmarksView from './bookmarks/BookmarksView';
import PrivacyPage from './privacy/PrivacyPage';

class App extends React.Component {
  componentWillMount() {
    if (this.props.user.loggedIn) {
      this.props.fetchUser();
      this.props.fetchNotifications(1, {list: 'unread'});
    }
  }

  render() {
    return (
      <Router>
        <div className="app-wrap">
          <NavBar />
          <LoginModal key={this.props.loginView} />
          <ReportModal />
          <ComposePostModal />
          <ConfirmEmailModal />
          <Route exact path="/" render={props => <HomeView key={this.props.user.id} {...props} />} />
          <Route path="/about" component={AboutPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/conversations/:postId" component={ConversationView} />
          <Route path="/login" render={props => {
            return this.props.user.loggedIn ? (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
              ) : <HomeView />;
          }} />
          <Route path="/signup" render={props => {
            return this.props.user.loggedIn ? (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
              ) : <HomeView />;
          }} />
          <Route path="/reset_password" render={props => {
            return this.props.user.loggedIn ? (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
              ) : <HomeView />;
          }} />
          <Route path="/activity/:list" render={props => {
            return this.props.user.loggedIn ? (
              <ActivityView key={props.match.params.list} {...props} />
            )  : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }} />
          <Route path="/bookmarks" render={(props) => {
            return this.props.user.loggedIn ? (
              <BookmarksView key={this.props.user.id} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }} />
          <Route path="/notification_settings" render={(props) => {
            return this.props.user.loggedIn ? (
              <UserSettingsView key={props.match.params.list} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }} />
          <Route path="/me/:list" render={(props) => {
            return this.props.user.loggedIn ? (
              <UserView key={props.match.params.list} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }} />
          <Footer />
        </div>
      </Router>
    );
  }
}

function actions(dispatch) {
  return {
    fetchNotifications: (page, options) => { dispatch(fetchNotifications(page, options)) },
    fetchUser: () => { dispatch(fetchUser()) },
  };
}

function select(store) {
  return {
    user: store.user,
    loginView: store.loginModal.view,
  };
}

export default connect(select, actions)(App);