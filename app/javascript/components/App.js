import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import LoginModal from './common/LoginModal';
import ReportModal from './common/ReportModal';
import NotFound from './common/NotFound';
import ComposePostModal from './common/ComposePostModal';
import HomeView from './home/HomeView';
import ConversationView from './conversations/ConversationView';
import UserView from './user/UserView';
import SearchView from './search/SearchView';
import ActivityView from './activity/ActivityView';
import AboutPage from './about/AboutPage';
import {connect} from 'react-redux';

import {
  fetchUser,
} from '../actions';

class App extends React.Component {
  componentWillMount() {
    if (this.props.user.loggedIn) {
      this.props.fetchUser();
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
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/login" component={HomeView} />
            <Route path="/about" component={AboutPage} />
            <Route path="/signup" component={HomeView} />
            <Route path="/reset_password" component={HomeView} />
            <Route path="/latest" component={HomeView} />
            <Route path="/popular" component={HomeView} />
            <Route path="/conversations/:postId" component={ConversationView} />
            <Route path="/search" component={SearchView} />
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
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

function actions(dispatch) {
  return {
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