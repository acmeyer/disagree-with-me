import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import NavBar from './common/NavBar';
import HomeView from './home/HomeView';
import UserView from './user/UserView';
import SearchView from './search/SearchView';
import ActivityView from './activity/ActivityView';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-wrap">
          <div className="top-bg bg-dark"></div>
          <NavBar />
          <Route exact path="/" component={HomeView} />
          <Route path="/latest" component={HomeView} />
          <Route path="/popular" component={HomeView} />
          <Route path="/search" component={SearchView} />
          <Route path="/activity" component={ActivityView} />
          <Route path="/me/:list" component={UserView} />
        </div>
      </Router>
    );
  }
}

export default App;