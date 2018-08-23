import React from 'react';

class PostCell extends React.Component {
  render() {
    return (
      <div className="post-cell p-3">
        {this.props.post.content}
      </div>
      );
  }
}

export default PostCell;