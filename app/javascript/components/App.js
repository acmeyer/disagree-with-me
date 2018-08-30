import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import NavBar from './common/NavBar';
import LoginModal from './common/LoginModal';
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
          <Route exact path="/" component={HomeView} />
          <Route path="/latest" component={HomeView} />
          <Route path="/popular" component={HomeView} />
          <Route path="/search" component={SearchView} />
          <Route path="/activity" component={ActivityView} />
          <Route path="/me/:list" render={(props) => <UserView key={props.match.params.list} {...props} />} />
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