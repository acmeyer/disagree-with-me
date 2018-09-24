import React from 'react';
import AppModal from './AppModal';
import { AppToaster }  from './AppToaster';
import { Button } from "@blueprintjs/core";

import {
  hideConfirmEmailModal,
  resendConfirmEmail,
} from '../../actions';
import {connect} from 'react-redux';

class ConfirmEmailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  close = () => {
    this.setState({loading: false});
    this.props.dispatch(hideConfirmEmailModal());
  }

  resendConfirmationEmail = () => {
    this.setState({loading: true});
    this.props.dispatch(resendConfirmEmail(this.props.email)).then(() => {
      mixpanel.track('Resent Confirm Email');
      this.close();
      AppToaster.show({ message: 'Resent confirmation email.', intent: "success", icon: "tick"});
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  render() {
    let message;
    let {visible, view} = this.props;

    if (this.props.view === 'signup') {
      message = "You will receive an email with instructions for how to confirm your email address in a few minutes."
    } else {
      message = "You need to confirm your email first."
    }
    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Confirm Email'}>
        <div className="confirm-email-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h1 className="display-4 text-center">Confirm your email</h1>
          <div>
            <p className="lead">{message}</p>
          </div>
          <hr/>
          <div className="d-flex flex-row justify-content-between align-items-center">
            Didn't get the email? 
            <Button 
              disabled={this.state.loading} 
              loading={this.state.loading} 
              onClick={() => this.resendConfirmationEmail()} 
            >
              Resend
            </Button>
          </div>
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    visible: store.confirmEmailModal.isVisible,
    view: store.confirmEmailModal.view,
    email: store.confirmEmailModal.email,
  };
}

export default connect(select)(ConfirmEmailModal);