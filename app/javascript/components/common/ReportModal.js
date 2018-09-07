import React from 'react';
import AppModal from './AppModal';
import { AppToaster }  from './AppToaster';
import { Button } from "@blueprintjs/core";

import {
  hideReportModal,
  reportContent,
} from '../../actions';
import {connect} from 'react-redux';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedReason: '',
    }
  }

  close = () => {
    this.setState({loading: false, selectedReason: ''});
    this.props.dispatch(hideReportModal());
  }

  report = () => {
    if (this.state.selectedReason === '') {
      AppToaster.show({ message: 'Reason for reporting is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(reportContent(this.props.data, this.state.selectedReason)).then(() => {
      this.close();
      AppToaster.show({ message: 'Report sent! Thanks for making our community safer.', intent: "success", icon: "tick"});
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  render() {
    let {visible, reporting_type} = this.props;
    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Report'}>
        <div className="report-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h1 className="display-4 text-center">Report {reporting_type}</h1>
          <div>
            <p className="lead text-center">Why are you reporting this {reporting_type}?</p>
          </div>
          <hr />
          <div className="form-group">
            Select reason
          </div>
          <Button 
            disabled={this.state.loading} 
            loading={this.state.loading} 
            onClick={() => this.report()} 
            fill 
            intent="primary" 
            large
          >
            Report
          </Button>
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    visible: store.reportModal.isVisible,
    reporting_type: store.reportModal.reporting_type,
    data: store.reportModal.data,
  };
}

export default connect(select)(LoginModal);