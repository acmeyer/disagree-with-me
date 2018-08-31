import React from 'react';
import AppModal from './AppModal';
import { AppToaster }  from './AppToaster';
import { Button } from "@blueprintjs/core";

import {
  loginWithEmail,
  hideLoginModal,
} from '../../actions';
import {connect} from 'react-redux';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
    }
  }

  close = () => {
    this.setState({loading: false, email: '', password: ''});
    this.props.dispatch(hideLoginModal());
  }

  login = () => {
    if (this.state.email === '') {
      AppToaster.show({ message: 'Email is required', intent: "danger", icon: "error" });
      return;
    }
    if (this.state.password === '') {
      AppToaster.show({ message: 'Password is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(loginWithEmail(this.state.email, this.state.password)).then(() => {
      this.close();
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  render() {
    let {visible} = this.props;
    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Login'}>
        <div className="login-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h1 className="display-4 text-center">Login</h1>
          <div>
            <p className="lead text-center">Login to Disagree with Me to create, respond, upvote, and save posts.</p>
          </div>
          <hr />
          <div className="form-group">
            <input 
              autoFocus={true}
              type="email" 
              className="form-control" 
              id="email-address" 
              aria-describedby="emailHelp" 
              placeholder="Email"
              onChange={(e) => this.setState({email: e.target.value})}
              onKeyDown={(e) => e.keyCode === 13 ? this.login() : null}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Password" 
              onChange={(e) => this.setState({password: e.target.value})}
              onKeyDown={(e) => e.keyCode === 13 ? this.login() : null}
              value={this.state.password}
            />
          </div>
          <Button 
            disabled={this.state.loading} 
            loading={this.state.loading} 
            onClick={() => this.login()} 
            onKeyDown={(e) => e.keyCode === 13 ? this.login() : null} 
            fill 
            intent="primary" 
            large
          >
            Login
          </Button>
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    visible: store.loginModal.isVisible,
  };
}

export default connect(select)(LoginModal);