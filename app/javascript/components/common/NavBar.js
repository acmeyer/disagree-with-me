import React from 'react';
import {
  Link,
} from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand">
        <div className="container justify-content-between">
          <Link to="/" className="navbar-brand">
            Disagree with Me
          </Link>
          <ul class="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/search" className="nav-link">
                <i className="fas fa-search" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/me/bookmarks" className="nav-link">
                <i className="far fa-bookmark" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/activity" className="nav-link">
                <i className="fas fa-bolt" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/me" className="nav-link">
                <i className="far fa-user-circle" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
