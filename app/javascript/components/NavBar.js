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
  Button,
} from "@blueprintjs/core";

import {
  showLoginModal,
  logOut,
} from '../actions';
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

  handleCreate = () => {
    if (this.props.user.loggedIn) {
      alert('Show create page');
    } else {
      this.showLogin();
    }
  }

  logOut = () => {
    this.setState({confirmLogOutVisible: false});
    this.props.logOut();
  }

  userMenu = () => {
    return (
      <Menu>
        <MenuItem text="My Posts" onClick={() => this.props.history.push('/me/posts')} />
        <MenuItem text="My Responses" onClick={() => this.props.history.push('/me/responses')} />
        <MenuItem text="My Thanks" onClick={() => this.props.history.push('/me/thanks')} />
        <MenuItem text="My Post Upvotes" onClick={() => this.props.history.push('/me/post-upvotes')} />
        <MenuItem text="My Response Upvotes" onClick={() => this.props.history.push('/me/response-upvotes')} />
        <MenuDivider />
        <MenuItem text="Log Out" onClick={() => this.setState({confirmLogOutVisible: true})} />
      </Menu>
    )
  }

  render() {
    let page, navLinks, createButton;
    let searchLink = (
      <li className="nav-item">
        <Link to="/search" className={`nav-link ${page === '/search' ? 'active' : ''}`}>
          <i className="fas fa-search" />
        </Link>
      </li>
    );
    createButton = (
      <li className="nav-item add-new-button">
        <div className="btn btn-light" onClick={this.handleCreate}>
          <i className="far fa-edit" />{' '}
          Create
        </div>
      </li>
    );
    if (this.props.user.loggedIn) {
      navLinks = (
        <ul className="navbar-nav ml-auto">
          {searchLink}
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
          {createButton}
        </ul>
      );
    } else {
      navLinks = (
        <ul className="navbar-nav ml-auto">
          {searchLink}
          <li className="nav-item">
            <div className={'nav-link'} onClick={this.showLogin}>
              Login
            </div>
          </li>
          {createButton}
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
