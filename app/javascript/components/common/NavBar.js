import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  showLoginModal,
} from '../../actions';

class NavBar extends React.Component {
  showLogin = (e) => {
    this.props.showLoginModal();
  }

  render() {
    let page, navLinks;
    if (this.props.user.loggedIn) {
      navLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/search" className={`nav-link ${page === '/search' ? 'active' : ''}`}>
              <i className="fas fa-search" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/me/bookmarks" className={`nav-link ${page === '/me/bookmarks' ? 'active' : ''}`}>
              <i className="fas fa-bookmark" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/activity" className={`nav-link ${page === '/activity' ? 'active' : ''}`}>
              <i className="fas fa-bolt" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/me/posts" className={`nav-link ${page === '/me' ? 'active' : ''}`}>
              <i className="fas fa-user-circle" />
            </Link>
          </li>
        </ul>
      );
    } else {
      navLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/search" className={`nav-link ${page === '/search' ? 'active' : ''}`}>
              <i className="fas fa-search" />
            </Link>
          </li>
          <li className="nav-item">
            <div className={'nav-link'} onClick={this.showLogin}>
              Login
            </div>
          </li>
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <div className="container justify-content-center">
          <Link to="/" className="navbar-brand">
            Disagree with Me
          </Link>
          {navLinks}
        </div>
      </nav>
    );
  }
}

function actions(dispatch) {
  return {
    showLoginModal: () => { dispatch(showLoginModal()) },
  };
}


function select(store) {
  return {
    user: store.user,
  };
}

export default connect(select, actions)(NavBar);
