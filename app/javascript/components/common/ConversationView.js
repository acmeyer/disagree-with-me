import React from 'react';
import AppModal from './AppModal';
import LoadingView from './LoadingView';
import PostActions from './PostActions';
import ResponseActions from './ResponseActions';
import ResponseInput from './ResponseInput';
import moment from 'moment';
import { NonIdealState } from "@blueprintjs/core";
import {
  hideConversationModal,
} from '../../actions';
import {connect} from 'react-redux';

class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      responseInFocus: false,
    }
  }

  hide = () => {
    this.setState({loading: false});
    this.props.dispatch(hideConversationModal());
  }

  renderResponse = (response) => {
    return (
      <div key={response.id} className="response py-3">
        {response.content}
        <div className="small time-ago text-muted">{moment(response.created_at).fromNow()}</div>
        <ResponseActions response={response} />
      </div>
    )
  }

  renderResponses = () => {
    let content;
    let {responses, responsesLoading} = this.props;
    if (responsesLoading) {
      content = <LoadingView />;
    } else if (responses.length > 0) {
      content = this.props.responses.map(this.renderResponse);
    } else {
      content = (
        <NonIdealState
          title="There are no responses yet"
          description="Be the first to share the opposing viewpoint."
        />
      );
    }
    return (
      <div className="responses-wrap">
        {content}
      </div>
    );
  }

  render() {
    let {visible, loading, post} = this.props;
    let content;
    if (loading) {
      content = <LoadingView />;
    } else if (post) {
      content = (
        <div className="conversation-wrap">
          <div className="post-wrap">
            <div className="post-text">{post.content}</div>
            <div className="small time-ago text-muted">{moment(post.created_at).fromNow()}</div>
            <PostActions 
              post={post} 
              handleShowComments={() => this.setState({responseInFocus: true})}
            />
          </div>
          <ResponseInput 
            post={post}
            inFocus={this.state.responseInFocus} 
            handleFocusChanged={(value) => this.setState({responseInFocus: value})} 
          />
          {this.renderResponses()}
        </div>
      )
    }

    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.hide} label={'Conversation'}>
        <div className="conversation-modal react-modal">
          <div className="dismiss-modal" onClick={this.hide}><i className="fas fa-times" /></div>
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