import React from 'react';
import LoadingView from '../common/LoadingView';
import PostActions from '../common/PostActions';
import ResponseActions from '../common/ResponseActions';
import ResponseInput from '../common/ResponseInput';
import moment from 'moment';
import { 
  Menu, 
  MenuItem,
  Popover, 
  NonIdealState,
  Button,
} from "@blueprintjs/core";
import {
  showLoginModal,
  showConversation,
  changeResponsesFilter,
} from '../../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      responseInFocus: false,
    }
  }

  componentWillMount() {
    let {postId} = this.props.match.params;
    this.props.dispatch(showConversation(postId));
  }

  componentDidMount() {
    let {postId} = this.props.match.params;
    mixpanel.track('Viewed Conversation', {post_id: postId});
  }

  showConversationComments = () => {
    let {postId} = this.props.match.params;
    if (this.props.user.loggedIn) {
      this.setState({responseInFocus: true});
    } else {
      this.props.dispatch(showLoginModal());
      mixpanel.track('Shown Login Modal', {from: 'show conversation responses', object_id: postId});
    }
  }

  renderResponse = (response) => {
    let authorIcon;
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
    mixpanel.track('Changed Response Filter', {thanked_only: thanked_only, post_id: this.props.post.id});
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

  handleLoadMoreResponses = () => {
    let postId = this.props.post.id;
    const page = this.props.responsesPage + 1;
    mixpanel.track('Load More Responses', {post_id: postId});
    this.props.dispatch(fetchConversationResponses(postId, page));
  }

  renderResponses = () => {
    let content, loadMore;
    let {responses, responsesLoading} = this.props;
    if (responsesLoading) {
      content = <LoadingView />;
    } else if (responses.length > 0) {
      content = this.props.responses.map(this.renderResponse);
      if (this.props.moreResponses) {
        loadMore = (
          <div className="load-more text-center m-3">
            <Button 
              onClick={this.handleLoadMoreResponses}
              loading={this.props.loadingMoreResponses}
              text="Load More Responses"
            />
          </div>
        )
      }
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
        {loadMore}
      </div>
    );
  }

  render() {
    let {loading, post} = this.props;
    let content, respondTo;
    if (loading) {
      content = <LoadingView />;
    } else if (post) {
      // user must be logged in and not the post author to respond
      if (this.props.user.loggedIn && !post.is_author) {
        respondTo = (
          <ResponseInput
            post={post}
            inFocus={this.state.responseInFocus} 
            handleFocusChanged={(value) => this.setState({responseInFocus: value})} 
          />
        )
      }
      content = (
        <div className="conversation-wrap">
          <div className="post-wrap">
            <div className="post-text">{post.content}</div>
            <div className="small time-ago text-muted">{moment(post.created_at).fromNow()}</div>
            <PostActions 
              post={post} 
              handleShowComments={this.showConversationComments}
            />
          </div>
          {respondTo}
          {this.renderResponses()}
        </div>
      )
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="conversation-view card mt-4">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

function select(store) {
  return {
    user: store.user,
    loading: store.conversation.loading,
    visible: store.conversation.isVisible,
    post: store.conversation.post,
    responses: store.conversation.responses.list,
    filters: store.conversation.responses.filters,
    responsesLoading: store.conversation.responses.loading,
    moreResponses: store.conversation.responses.moreResults,
    loadingMoreResponses: store.conversation.responses.loadingMore,
    responsesPage: store.conversation.responses.page,
  };
}

export default withRouter(connect(select)(ConversationView));