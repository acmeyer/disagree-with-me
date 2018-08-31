import React from 'react';
import AppReadMore from './AppReadMore';

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
          </div>
        </div>
      )
    } else {
      return;
    }
  }

  renderActionMenu = () => {
    return (
      <div className="cell-actions flex-row d-flex mt-3">
        <div className="action pr-4" onClick={this.toggleUpvote}>
          <i className="fas fa-arrow-up" />
        </div>
        <div className="action pr-4" onClick={this.showPostComments}>
          <i className="far fa-comment" />
        </div>
        <div className="action pr-4" onClick={this.toggleBookmark}>
          <i className="far fa-bookmark" />
        </div>
        <div className="action pr-4" onClick={this.showSharingOptions}>
          <i className="far fa-share-square" />
        </div>
        <div  className="action" onClick={this.showMoreOptions}>
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="card cell post-cell mb-2" onClick={this.showPost}>
        <div className="p-3">
          <AppReadMore length={150} text={this.props.post.content} />
          {this.renderActionMenu()}
        </div>
        {this.renderTopResponse()}
      </div>
      );
  }
}

export default PostCell;