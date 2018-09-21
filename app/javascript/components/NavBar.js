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
} from "@blueprintjs/core";

import {
  showLoginModal,
  showComposeView,
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

  componentWillMount() {
    this.routeUnlisten = this.props.history.listen((location, action) => {
      if ($('.navbar-collapse.collapse.show').length) {
        $('.navbar-toggler').click();
      }
    });
  }

  componentWillUnmount() {
    this.routeUnlisten();
  }

  showLogin = (view) => {
    this.props.showLoginModal(view);
  }

  handleCreate = () => {
    if (this.props.user.loggedIn) {
      this.props.showComposeView();
    } else {
      this.showLogin('signup');
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
        <MenuItem text="Notification Settings" onClick={() => this.props.history.push('/notification_settings')} />
        <MenuDivider />
        <MenuItem text="Log Out" onClick={() => this.setState({confirmLogOutVisible: true})} />
      </Menu>
    )
  }

  render() {
    let page, navLinks, createButton;
    createButton = (
      <li className="nav-item add-new-button">
        <div className="btn btn-light" onClick={this.handleCreate}>
          <i className="far fa-edit" />{' '}
          Create
        </div>
      </li>
    );
    if (this.props.user.loggedIn) {
      let notification_count;
      if (this.props.unreadNotifications > 0) {
        notification_count = <span className="badge badge-pill badge-danger">{this.props.unreadNotifications}</span>;
      }
      navLinks = (
        <ul className="navbar-nav ml-auto">
          {/* {searchLink} */}
          <li className="nav-item">
            <Link to="/bookmarks" className={`nav-link ${page === '/bookmarks' ? 'active' : ''}`}>
              <i className="fas fa-bookmark" />
              <span className="pl-2 d-md-none">Bookmarks</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/activity/unread" className={`nav-link ${page === '/activity' ? 'active' : ''}`}>
              <i className="fas fa-bolt" />{notification_count}
              <span className="pl-2 d-md-none">Activity</span>
            </Link>
          </li>
          <li className="nav-item">
            <Popover content={this.userMenu()} position={Position.CENTER_BOTTOM}>
              <a className={`nav-link ${page === '/me' ? 'active' : ''}`}>
                <i className="fas fa-user-circle" />
                <span className="pl-2 d-md-none">Me</span>
              </a>
            </Popover>
          </li>
          {createButton}
        </ul>
      );
    } else {
      navLinks = (
        <ul className="navbar-nav ml-auto">
          {/* {searchLink} */}
          <li className="nav-item">
            <div className={'nav-link'} onClick={(e) => this.showLogin('login')}>
              Login
            </div>
          </li>
          {createButton}
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-md fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Disagree with Me
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbar-collapse-menu" 
            aria-controls="navbar-collapse-menu" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-collapse-menu">
            {navLinks}
          </div>
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
    showLoginModal: (view) => { dispatch(showLoginModal(view)) },
    showComposeView: () => { dispatch(showComposeView()) },
  };
}


function select(store) {
  return {
    user: store.user,
    unreadNotifications: store.notifications.unreadCount,
  };
}

export default withRouter(connect(select, actions)(NavBar));
