import React from 'react';
import AppReadMore from './AppReadMore';
import moment from  'moment';
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
} from '../../actions';

class PostCell extends React.Component {
  showPost = (e) => {
    alert('Show this post!');
  }

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
      alert('Show responses');
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

  renderTopResponse = () => {
    let {top_response} = this.props.post;
    if (this.props.showTopResponse && top_response) {
      return (
        <div className="top-response p-3 bg-light">
          <div className="heading">
            <i className="far fa-star mr-1" />
            Top Response:
          </div>
          <div className="body mt-2">
            <AppReadMore length={150} text={top_response.content} />
            <div className="small time-ago text-muted">{moment(top_response.created_at).fromNow()}</div>
          </div>
        </div>
      )
    } else {
      return;
    }
  }

  renderActionMenu = () => {
    let {post} = this.props;
    return (
      <div className="cell-actions flex-row d-flex mt-3">
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

  render() {
    return (
      <div className="card cell post-cell mb-2" onClick={this.showPost}>
        <div className="p-3">
          <AppReadMore length={300} text={this.props.post.content} />
          <div className="small time-ago text-muted">{moment(this.props.post.created_at).fromNow()}</div>
          {this.renderActionMenu()}
        </div>
        {this.renderTopResponse()}
      </div>
      );
  }
}

function actions(dispatch) {
  return {
    showLoginModal: () => { dispatch(showLoginModal()) },
    togglePostUpvote: (post) => { dispatch(togglePostUpvote(post)) },
    togglePostBookmark: (post) => { dispatch(togglePostBookmark(post)) },
  };
}

export default connect(null, actions)(PostCell);