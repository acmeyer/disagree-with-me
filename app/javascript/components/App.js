import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import NavBar from './common/NavBar';
import HomeView from './main/HomeView';
import UserView from './user/UserView';
import SearchView from './search/SearchView';
import ActivityView from './activity/ActivityView';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={HomeView} />
          <Route path="/search" component={SearchView} />
          <Route path="/activity" component={ActivityView} />
          <Route path="/me" component={UserView} />
        </div>
      </Router>
    );
  }
}

export default App;