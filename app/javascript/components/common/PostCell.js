import React from 'react';
import AppReadMore from './AppReadMore';
import moment from  'moment';

class PostCell extends React.Component {
  showPost = (e) => {
    alert('Show this post!');
  }

  toggleUpvote = (e) => {
    e.stopPropagation();
    alert('Toggle Post Upvote');
  }

  toggleBookmark = (e) => {
    e.stopPropagation();
    alert('Toggle Post Bookmark');
  }

  showPostComments = (e) => {
    e.stopPropagation();
    alert('Show Post\'s Comments!');
  }

  showSharingOptions = (e) => {
    e.stopPropagation();
    alert('Show sharing options');
  }

  showMoreOptions = (e) => {
    e.stopPropagation();
    alert('Show more options');
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
            <AppReadMore length={100} text={top_response.content} />
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
          <span className={`action-icon ${post.upvoted ? 'active' : null}`}><i className={`fas fa-arrow-up`} /></span>
          <span className={`action-count ${post.upvoted ? 'active' : null}`}>{post.upvotes_count > 0 && post.upvotes_count}</span>
        </div>
        <div className="action pr-4" onClick={this.showPostComments}>
          <span className={`action-icon ${post.responded_to ? 'active' : null}`}><i className={`${post.responded_to ? 'fas' : 'far'} fa-comment`} /></span>
          <span className={`action-count ${post.responded_to ? 'active' : null}`}>{post.responses_count > 0 && post.responses_count}</span>
        </div>
        <div className="action pr-4" onClick={this.toggleBookmark}>
          <span className={`action-icon ${post.bookmarked ? 'active' : null}`}><i className={`${post.bookmarked ? 'fas' : 'far'} fa-bookmark`} /></span>
        </div>
        <div className="action pr-4" onClick={this.showSharingOptions}>
          <span className={`action-icon`}><i className="far fa-share-square" /></span>
        </div>
        <div  className="action" onClick={this.showMoreOptions}>
          <span className={`action-icon`}><i className="fas fa-ellipsis-h" /></span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="card cell post-cell mb-2" onClick={this.showPost}>
        <div className="p-3">
          <AppReadMore length={150} text={this.props.post.content} />
          <div className="small time-ago text-muted">{moment(this.props.post.created_at).fromNow()}</div>
          {this.renderActionMenu()}
        </div>
        {this.renderTopResponse()}
      </div>
      );
  }
}

export default PostCell;