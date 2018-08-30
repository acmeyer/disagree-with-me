import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { 
  Menu, 
  MenuDivider, 
  MenuItem, 
  Popover, 
  Position,
  Alert,
  Classes,
  Button,
} from "@blueprintjs/core";

import {
  showLoginModal,
  logOut,
} from '../../actions';
import {connect} from 'react-redux';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmLogOutVisible: false,
    }
  }

  showLogin = (e) => {
    this.props.showLoginModal();
  }

  logOut = () => {
    this.setState({confirmLogOutVisible: false});
    this.props.logOut();
  }

  userMenu = () => {
    return (
      <Menu>
        <MenuItem text="Posts" onClick={() => this.props.history.push('/me/posts')} />
        <MenuItem text="Responses" onClick={() => this.props.history.push('/me/responses')} />
        <MenuItem text="Thanks" onClick={() => this.props.history.push('/me/thanks')} />
        <MenuItem text="Post Upvotes" onClick={() => this.props.history.push('/me/post-upvotes')} />
        <MenuItem text="Response Upvotes" onClick={() => this.props.history.push('/me/response-upvotes')} />
        <MenuDivider />
        <MenuItem text="Log Out" onClick={() => this.setState({confirmLogOutVisible: true})} />
      </Menu>
    )
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
            <Popover content={this.userMenu()} position={Position.CENTER_BOTTOM}>
              <a className={`nav-link ${page === '/me' ? 'active' : ''}`}>
                <i className="fas fa-user-circle" />
              </a>
            </Popover>
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
        <div className="container">
          <Link to="/" className="navbar-brand">
            Disagree with Me
          </Link>
          {navLinks}
          <Alert
            isOpen={this.state.confirmLogOutVisible}
            cancelButtonText="Cancel"
            confirmButtonText="Log Out"
            intent="danger"
            onCancel={() => this.setState({confirmLogOutVisible: false})}
            onConfirm={this.logOut}
          >
            <p>Are you sure you want to log out of Disagree with Me?</p>
          </Alert>
        </div>
      </nav>
    );
  }
}

function actions(dispatch) {
  return {
    logOut: () => { dispatch(logOut()) },
    showLoginModal: () => { dispatch(showLoginModal()) },
  };
}


function select(store) {
  return {
    user: store.user,
  };
}

export default withRouter(connect(select, actions)(NavBar));
