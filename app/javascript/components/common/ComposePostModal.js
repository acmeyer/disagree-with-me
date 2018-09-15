import React from 'react';
import AppModal from './AppModal';
import { AppToaster }  from './AppToaster';
import { Button, Alert } from "@blueprintjs/core";

import {
  hideComposeView,
  createPost,
} from '../../actions';
import {connect} from 'react-redux';

class ComposePostModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: '',
      cancelConfirmationVisible: false,
    }
  }

  close = () => {
    if (this.state.content.length > 0) {
      this.setState({cancelConfirmationVisible: true});
    } else {
      this.hide();
    }
  }

  hide = () => {
    this.setState({loading: false, content: '', cancelConfirmationVisible: false});
    this.props.dispatch(hideComposeView());
  }

  postIsValid = () => {
    return !this.state.loading && this.state.content.length > 0;
  }

  updatePostContent = (text) => {
    this.setState({
      content: text,
    });
  }

  create = () => {
    if (this.state.content === '') {
      AppToaster.show({ message: 'Content is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(createPost(this.state.content)).then((postId) => {
      mixpanel.track('Created Post', {post_id: postId});
      this.hide();
      AppToaster.show({ message: "Post created!", intent: "success", icon: "tick" });
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  render() {
    let {visible} = this.props;

    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Compose'}>
        <div className="compose-post-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h5 className="text-center mb-3">Create Post</h5>
          <div>
            <div className="form-group">
              <textarea 
                autoFocus={true}
                className="form-control" 
                id="post-content" 
                rows="5"
                placeholder="What are you seeking feeback on?"
                onChange={(e) => this.updatePostContent(e.target.value)}
                value={this.state.content}
              />
            </div>
          </div>
          <Button 
            disabled={!this.postIsValid()} 
            loading={this.state.loading} 
            onClick={() => this.create()} 
            fill 
            intent="primary" 
            large
          >
            Create
          </Button>
          <Alert
            cancelButtonText="Cancel"
            confirmButtonText="Discard"
            intent="danger"
            isOpen={this.state.cancelConfirmationVisible}
            onCancel={() => this.setState({cancelConfirmationVisible: false})}
            onConfirm={this.hide}
          >
            <p>
              Are you sure you want to discard this post?
            </p>
          </Alert>
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    visible: store.composePostModal.isVisible,
  };
}

export default connect(select)(ComposePostModal);