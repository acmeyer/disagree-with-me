import React from 'react';
import AppModal from './AppModal';
import {connect} from 'react-redux';

import {
  hideLoginModal,
} from '../../actions';

class LoginModal extends React.Component {

  render() {
    let {visible, close} = this.props;
    return (
      <AppModal isOpen={visible} close={close} label={'Login'}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="close" onClick={close} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </AppModal>
    );
  }
}

function actions(dispatch) {
  return {
    close: () => { dispatch(hideLoginModal()) },
  };
}

function select(store) {
  return {
    visible: store.loginModal.isVisible,
  };
}

export default connect(select, actions)(LoginModal);