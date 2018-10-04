import React from 'react';
import {connect} from 'react-redux';
import { 
  Menu, 
  MenuItem,
  Popover, 
  Position,
  Tooltip,
} from "@blueprintjs/core";
import {
  showLoginModal,
  togglePostUpvote,
  togglePostBookmark,
  showReportModal,
} from '../../actions';
import {
  domain,
  protocol,
} from '../../env';

class PostActions extends React.Component {

  toggleUpvote = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.togglePostUpvote(this.props.post);
      mixpanel.track('Toggled Post Upvote', {post_id: this.props.post.id});
    } else {
      this.props.showLoginModal('login');
      mixpanel.track('Shown Login Modal', {from: 'toggle post upvote', object_id: this.props.post.id});
    }
  }

  toggleBookmark = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.togglePostBookmark(this.props.post);
      mixpanel.track('Toggled Post Bookmark', {post_id: this.props.post.id});
    } else {
      this.props.showLoginModal('login');
      mixpanel.track('Shown Login Modal', {from: 'toggle post bookmark', object_id: this.props.post.id});
    }
  }

  showSharingOptions = (e) => {
    e.stopPropagation();
  }

  showMoreOptions = (e) => {
    e.stopPropagation();
  }

  handleShare = (type) => {
    let subject = "Check out this conversation on Disagree with Me";
    let shareLink = `${protocol}${domain}/conversations/${this.props.post.id}`;
    let message = `"${_.truncate(this.props.post.content, 200)}" Agree? Disagree? Join the conversation.`;
    let email = `${message}\n${shareLink}`;
    if (type === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${message}&url=${shareLink}&hashtags=disagreewithme&via=DisagreeApp`,
        '_blank'
      );
      mixpanel.track('Shared Conversation', {post_id: this.props.post.id, via: 'twitter'});
    } else if (type === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${this.props.post.content}`,
        '_blank'
      );
      mixpanel.track('Shared Conversation', {post_id: this.props.post.id, via: 'facebook'});
    } else if (type === 'email') {
      window.open(
        `mailto:?subject=${subject}&body=${email}`,
        '_blank'
      );
      mixpanel.track('Shared Conversation', {post_id: this.props.post.id, via: 'email'});
    } else {
      alert('Not a recognized share!');
    }
  }

  renderShareMenu = () => {
    return (
      <Menu>
        <MenuItem text="Twitter" onClick={() => this.handleShare('twitter')} />
        <MenuItem text="Facebook" onClick={() => this.handleShare('facebook')} />
        <MenuItem text="Email" onClick={() => this.handleShare('email')} />
      </Menu>
    );
  }

  handleShowReport = () => {
    if (this.props.user.loggedIn) {
      this.props.showReport(this.props.post, 'post');
    } else {
      this.props.showLoginModal('login');
      mixpanel.track('Shown Login Modal', {from: 'report post', object_id: this.props.post.id});
    }
  }

  renderMoreOptionsMenu = () => {
    return (
      <Menu>
        <MenuItem text="Report This Post" onClick={() => this.handleShowReport()} />
      </Menu>
    );
  }
  
  render() {
    let {post} = this.props;
    return (
      <div className="cell-actions flex-row d-flex mt-3">
        <div className="action pr-4" onClick={this.toggleUpvote}>
          <Tooltip content="Upvote" position="top">
            <span className={`action-icon ${post.upvoted ? 'active' : null}`}><i className={`fas fa-arrow-up`} /></span>
          </Tooltip>
          <span className={`action-count ${post.upvoted ? 'active' : null}`}>{post.upvotes_count > 0 && post.upvotes_count}</span>
        </div>
        <div className="action pr-4" onClick={this.props.handleShowComments}>
          <Tooltip content="Respond" position="top">
            <span className={`action-icon ${post.responded_to ? 'active' : null}`}><i className={`${post.responded_to ? 'fas' : 'far'} fa-comment`} /></span>
          </Tooltip>
          <span className={`action-count ${post.responded_to ? 'active' : null}`}>{post.responses_count > 0 && post.responses_count}</span>
        </div>
        <div className="action pr-4" onClick={this.toggleBookmark}>
          <Tooltip content="Bookmark" position="top">
            <span className={`action-icon ${post.bookmarked ? 'active' : null}`}><i className={`${post.bookmarked ? 'fas' : 'far'} fa-bookmark`} /></span>
          </Tooltip>
        </div>
        <div className="action pr-4" onClick={this.showSharingOptions}>
          <Popover content={this.renderShareMenu()} position={Position.RIGHT_CENTER}>
            <Tooltip content="Share" position="top">
              <span className={`action-icon`}><i className="far fa-share-square" /></span>
            </Tooltip>
          </Popover>
        </div>
        <div  className="action" onClick={this.showMoreOptions}>
          <Popover content={this.renderMoreOptionsMenu()} position={Position.RIGHT_CENTER}>
            <Tooltip content="More" position="top">
              <span className={`action-icon`}><i className="fas fa-ellipsis-h" /></span>
            </Tooltip>
          </Popover>
        </div>
      </div>
    )
  }
}

function actions(dispatch) {
  return {
    showLoginModal: (view) => { dispatch(showLoginModal(view)) },
    togglePostUpvote: (post) => { dispatch(togglePostUpvote(post)) },
    togglePostBookmark: (post) => { dispatch(togglePostBookmark(post)) },
    showReport: (post, type) => { dispatch(showReportModal(post, type)) },
  };
}

function select(store) {
  return {
    user: store.user,
  };
}

export default connect(select, actions)(PostActions);