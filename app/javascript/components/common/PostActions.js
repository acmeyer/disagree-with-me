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
  showConversation,
  togglePostUpvote,
  togglePostBookmark,
} from '../../actions';

class PostActions extends React.Component {

  toggleUpvote = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.togglePostUpvote(this.props.post);
    } else {
      this.props.showLoginModal();
    }
  }

  toggleBookmark = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.togglePostBookmark(this.props.post);
    } else {
      this.props.showLoginModal();
    }
  }

  showPostComments = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.showConversation(this.props.post);
    } else {
      this.props.showLoginModal();
    }
  }

  showSharingOptions = (e) => {
    e.stopPropagation();
  }

  showMoreOptions = (e) => {
    e.stopPropagation();
  }

  renderShareMenu = () => {
    return (
      <Menu>
        <MenuItem text="Twitter" />
        <MenuItem text="Facebook" />
        <MenuItem text="Email" />
      </Menu>
    );
  }

  renderMoreOptionsMenu = () => {
    return (
      <Menu>
        <MenuItem text="Report This Post" />
      </Menu>
    );
  }
  
  render() {
    let {post} = this.props;
    return (
      <div id="post-actions" className="flex-row d-flex mt-3">
          <div className="action pr-4" onClick={this.toggleUpvote}>
            <Tooltip content="Upvote" position="top">
              <span className={`action-icon ${post.upvoted ? 'active' : null}`}><i className={`fas fa-arrow-up`} /></span>
            </Tooltip>
            <span className={`action-count ${post.upvoted ? 'active' : null}`}>{post.upvotes_count > 0 && post.upvotes_count}</span>
          </div>
        <div className="action pr-4" onClick={this.showPostComments}>
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
    showLoginModal: () => { dispatch(showLoginModal()) },
    showConversation: (post) => { dispatch(showConversation(post)) },
    togglePostUpvote: (post) => { dispatch(togglePostUpvote(post)) },
    togglePostBookmark: (post) => { dispatch(togglePostBookmark(post)) },
  };
}

function select(store) {
  return {
    user: store.user,
  };
}

export default connect(select, actions)(PostActions);