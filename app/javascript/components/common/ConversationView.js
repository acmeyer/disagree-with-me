import React from 'react';
import AppModal from './AppModal';
import LoadingView from './LoadingView';
import PostActions from './PostActions';
import ResponseActions from './ResponseActions';
import ResponseInput from './ResponseInput';
import moment from 'moment';
import { 
  Menu, 
  MenuItem,
  Popover, 
  NonIdealState,
  Button,
  Tooltip,
} from "@blueprintjs/core";
import {
  hideConversationModal,
  changeResponsesFilter,
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
    let authorIcon;
    if (response.is_post_author) {
      authorIcon = (
        <Tooltip content="Post Author" position="top">
          <span className="mr-2 is-author-icon"><i className="fas fa-pen-nib" /></span>
        </Tooltip>
      );
    }
    return (
      <div key={response.id} className="response py-3">
        {authorIcon}
        {response.content}
        <div className="small time-ago text-muted">{moment(response.created_at).fromNow()}</div>
        <ResponseActions response={response} />
      </div>
    )
  }

  handleChangeResponseFilters = (thanked_only) => {
    this.props.dispatch(changeResponsesFilter(thanked_only, this.props.post.id));
  }

  renderResponseFiltersMenu = () => {
    return (
      <Menu>
        {!this.props.filters.thanked_only && <MenuItem text="Top Responses" onClick={() => this.handleChangeResponseFilters(true)} />}
        {this.props.filters.thanked_only && <MenuItem text="All Responses" onClick={() => this.handleChangeResponseFilters(false)} />}
      </Menu>
    );
  }

  renderResponseFilter = () => {
    return (
      <Popover content={this.renderResponseFiltersMenu()} position="bottom">
        <div className="responses-filter-heading small text-muted text-uppercase">
          <span className="mr-2">{this.props.filters.thanked_only ? 'Top Responses' : 'All Responses'}</span>
          <i className="fas fa-angle-down" />
        </div>
      </Popover>
    );
  }

  renderResponses = () => {
    let content;
    let {responses, responsesLoading} = this.props;
    if (responsesLoading) {
      content = <LoadingView />;
    } else if (responses.length > 0) {
      content = this.props.responses.map(this.renderResponse);
    } else {
      let message, description, action;
      if (this.props.filters.thanked_only) {
        message = "There are no Top Responses yet";
        description = this.props.post.is_author 
          ?  "You need to thank some responses before they show up here."
          : "Share your opposing viewpoint to show up here.";
        action = <Button text="See All Responses" onClick={() => this.handleChangeResponseFilters(false)} />;
      } else {
        message = "There are no responses yet";
        description = "Be the first to share the opposing viewpoint.";
        action = <Button text="See All Responses" onClick={() => this.handleChangeResponseFilters(false)} />;
      }
      content = (
        <NonIdealState
          title={message}
          description={description}
          action={action}
        />
      );
    }
    return (
      <div className="responses-wrap">
        {this.renderResponseFilter()}
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
    filters: store.conversation.responses.filters,
    responsesLoading: store.conversation.responses.loading,
  };
}

export default connect(select)(ConversationView);