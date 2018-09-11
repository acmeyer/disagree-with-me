import React from 'react';
import { AppToaster }  from './AppToaster';
import { Button } from "@blueprintjs/core";

import {
  createResponse,
} from '../../actions';
import {connect} from 'react-redux';

const MAX_POST_LENGTH = 500;

class ResponseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: '',
      remainingCharacters: MAX_POST_LENGTH,
      cancelConfirmationVisible: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inFocus !== this.props.inFocus) {
      if (this.props.inFocus) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  responseIsValid = () => {
    return !this.state.loading && (this.state.content.length > 0 && this.state.content.length <= MAX_POST_LENGTH);
  }

  updateResponseContent = (text) => {
    this.setState({
      content: text,
      remainingCharacters: MAX_POST_LENGTH - text.length,
    });
  }

  resetInput = () => {
    this.setState({loading: false, content: '', remainingCharacters: MAX_POST_LENGTH});
    this.input.blur();
  }

  create = () => {
    if (this.state.content === '') {
      AppToaster.show({ message: 'Content is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(createResponse(this.state.content, this.props.post.id)).then((response) => {
      mixpanel.track('Created Response', {response_id: response.id, reason: this.state.selectedReason});
      this.resetInput();
      AppToaster.show({ message: "Response created!", intent: "success", icon: "tick" });
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
          rows={(inFocus || this.responseIsValid()) ? '3' : '1'}
          placeholder="Share your feedback"
          onChange={(e) => this.updateResponseContent(e.target.value)}
          onFocus={() => this.props.handleFocusChanged(true)}
          onBlur={() => this.props.handleFocusChanged(false)}
          value={this.state.content}
        />
        {(inFocus || this.responseIsValid()) &&
          <div>
            <div className={`d-flex justify-content-end mt-1 remaining-characters-count small ${this.state.remainingCharacters < 21 ? 'text-danger' : 'text-muted' }`}>
              {this.state.remainingCharacters} characters left
            </div>
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