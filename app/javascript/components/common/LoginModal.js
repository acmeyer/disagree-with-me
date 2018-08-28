import React from 'react';
import AppModal from './AppModal';
import {connect} from 'react-redux';

import {
  hideLoginModal,
} from '../../actions';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  close = () => {
    this.setState({email: '', password: ''});
    this.props.hideModal();
  }

  render() {
    let {visible} = this.props;
    return (
      <AppModal isOpen={visible} close={this.close} label={'Login'}>
        <div className="login-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h1 className="display-4 text-center">Login</h1>
          <div>
            <p className="lead text-center">Login to Disagree with Me to create, respond, upvote, and save posts.</p>
          </div>
          <hr />
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id="email-address" 
              aria-describedby="emailHelp" 
              placeholder="Email"
              onChange={(e) => this.setState({email: e.target.value})}
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
              value={this.state.password}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </div>
      </AppModal>
    );
  }
}

function actions(dispatch) {
  return {
    hideModal: () => { dispatch(hideLoginModal()) },
  };
}

function select(store) {
  return {
    visible: store.loginModal.isVisible,
  };
}

export default connect(select, actions)(LoginModal);