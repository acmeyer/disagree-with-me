import React from 'react';
import AppModal from './AppModal';
import { AppToaster }  from './AppToaster';
import { Button } from "@blueprintjs/core";
import Select from 'react-select';

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
      description: '',
    }
  }

  close = () => {
    this.setState({loading: false, selectedReason: '', description: ''});
    this.props.dispatch(hideReportModal());
  }

  report = () => {
    if (this.state.selectedReason === '') {
      AppToaster.show({ message: 'A reason for reporting is required', intent: "danger", icon: "error" });
      return;
    }
    if (this.state.selectedReason.value === 'other') {
      AppToaster.show({ message: 'A description is required when the \'Other\' option is selected', intent: "danger", icon: "error"})
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(reportContent(this.props.data, this.state.selectedReason.value, this.state.description)).then(() => {
      this.close();
      AppToaster.show({ message: 'Report sent! Thanks for helping improve the community.', intent: "success", icon: "tick"});
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  render() {
    let {visible, reporting_type} = this.props;
    const reporting_options = [
      { value: 'off-topic', label: 'Off-Topic' },
      { value: 'inappropriate', label: 'Inappropriate' },
      { value: 'abusive', label: 'Abusive' },
      { value: 'other', label: 'Other' },
    ]
    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Report'}>
        <div className="report-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h5 className="text-center mb-3">Report {reporting_type}</h5>
          <div>
            <p className="lead">Why are you reporting this {reporting_type}?</p>
          </div>
          <div className="form-group">
            <Select 
              placeholder="Select Reason" 
              options={reporting_options} 
              value={this.state.selectedReason} 
              onChange={(value) => this.setState({selectedReason: value})}
            />
          </div>
          <div className="form-group">
            <textarea 
              className="form-control" 
              id="report-description" 
              rows="4"
              placeholder="Add a description of your report..."
              onChange={(e) => this.setState({description: e.target.value})}
              value={this.state.description}
            />
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