import React from 'react';
import AppModal from './AppModal';
import LoadingView from './LoadingView';

import {
  hideConversationModal,
} from '../../actions';
import {connect} from 'react-redux';

class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  hide = () => {
    this.setState({loading: false});
    this.props.dispatch(hideConversationModal());
  }

  renderResponse = (response) => {
    return (
      <div className="response">
        {response.content}
      </div>
    )
  }

  render() {
    let {visible, loading, post} = this.props;
    let content;
    if (loading) {
      content = <LoadingView />;
    } else {
      const responses = this.props.responses.map(this.renderResponse);
      content = (
        <div className="conversation-wrap">
          {post && post.content}
          {responses}
        </div>
      )
    }

    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.hide} label={'Conversation'}>
        <div className="conversation-modal react-modal">
          <div className="dismiss-modal" onClick={this.hide}><i className="fas fa-times" /></div>
          <h5 className="text-center">Conversation</h5>
          <div>
            {content}
          </div>
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    loading: store.conversation.loading,
    visible: store.conversation.isVisible,
    post: store.conversation.post,
    responses: store.conversation.responses.list,
    responsesLoading: store.conversation.responses.loading,
  };
}

export default connect(select)(ConversationView);