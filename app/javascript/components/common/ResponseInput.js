import React from 'react';
import { AppToaster }  from './AppToaster';
import { Button } from "@blueprintjs/core";

import {
  createResponse,
} from '../../actions';
import {connect} from 'react-redux';

class ResponseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: '',
      cancelConfirmationVisible: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inFocus !== this.props.inFocus) {
      if (this.props.inFocus || this.state.loading) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  responseIsValid = () => {
    return !this.state.loading && this.state.content.length > 0;
  }

  updateResponseContent = (text) => {
    this.setState({
      content: text,
    });
  }

  resetInput = () => {
    this.setState({loading: false, content: ''});
  }

  create = () => {
    if (this.state.content === '') {
      AppToaster.show({ message: 'Content is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(createResponse(this.state.content, this.props.post.id)).then((response) => {
      mixpanel.track('Created Response', {response_id: response.id, reason: this.state.selectedReason});
      AppToaster.show({ message: "Response created!", intent: "success", icon: "tick" });
      this.resetInput();
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  render() {
    let {inFocus} = this.props;
    return (
      <div className="respond-to-wrap">
        <textarea
          ref={(input) => { this.input = input; }}
          className="form-control" 
          id="respond-to-content" 
          rows={(inFocus || this.responseIsValid() || this.state.loading) ? '3' : '1'}
          placeholder="Share your feedback"
          disabled={this.state.loading}
          onChange={(e) => this.updateResponseContent(e.target.value)}
          onFocus={() => this.props.handleFocusChanged(true)}
          onBlur={() => this.props.handleFocusChanged(false)}
          value={this.state.content}
        />
        {(inFocus || this.responseIsValid() || this.state.loading) &&
          <div>
            <div className="create-response mt-3 d-flex justify-content-end">
              <Button 
                disabled={!this.responseIsValid()} 
                loading={this.state.loading} 
                onClick={() => this.create()}
                intent="primary" 
                large
              >
                Respond
              </Button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect()(ResponseInput);