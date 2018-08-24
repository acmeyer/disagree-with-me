import React from 'react';

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

  showActionsMenu = () => {
    return (
      <div className="cell-actions flex-row d-flex mt-3">
        <div className="action pr-3" onClick={this.toggleUpvote}>
          <i className="fas fa-arrow-up" />
        </div>
        <div className="action pr-3" onClick={this.showPostComments}>
          <i className="far fa-comment" />
        </div>
        <div className="action pr-3" onClick={this.toggleBookmark}>
          <i className="far fa-bookmark" />
        </div>
        <div className="action pr-3" onClick={this.showSharingOptions}>
          <i className="far fa-share-square" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="card cell post-cell p-3 mb-2" onClick={this.showPost}>
        {this.props.post.content}
        {this.showActionsMenu()}
      </div>
      );
  }
}

export default PostCell;