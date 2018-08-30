import React from 'react';

class ResponseCell extends React.Component {
  showPost = (e) => {
    alert('Show this post!');
  }

  toggleUpvote = (e) => {
    e.stopPropagation();
    alert('Toggle Post Upvote');
  }

  showMoreOptions = (e) => {
    e.stopPropagation();
    alert('Show more options');
  }

  showActionsMenu = () => {
    return (
      <div className="cell-actions flex-row d-flex mt-3">
        <div className="action pr-4" onClick={this.toggleUpvote}>
          <i className="fas fa-arrow-up" />
        </div>
        <div  className="action" onClick={this.showMoreOptions}>
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="card cell response-cell p-3 mb-2" onClick={this.showPost}>
        {this.props.response.content}
        {this.showActionsMenu()}
      </div>
      );
  }
}

export default ResponseCell;