import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import LoginModal from './common/LoginModal';
import ComposePostModal from './common/ComposePostModal';
import ConversationView from './common/ConversationView';
import HomeView from './home/HomeView';
import UserView from './user/UserView';
import SearchView from './search/SearchView';
import ActivityView from './activity/ActivityView';
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
          <LoginModal />
          <ComposePostModal />
          <ConversationView />
          <Route exact path="/" component={HomeView} />
          <Route path="/login" component={HomeView} />
          <Route path="/latest" component={HomeView} />
          <Route path="/popular" component={HomeView} />
          {/* <Route path="/conversations/:id" component={HomeView} /> */}
          <Route path="/search" component={SearchView} />
          <Route path="/activity" render={props => {
            return this.props.user.loggedIn ? <ActivityView /> : (
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
    fetchUser: () => { dispatch(fetchUser()) },
  };
}

function select(store) {
  return {
    user: store.user,
  };
}

export default connect(select, actions)(App);