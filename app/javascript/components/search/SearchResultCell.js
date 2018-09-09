import React from 'react';
import AppReadMore from '../common/AppReadMore';
import PostActions from '../common/PostActions';
import moment from 'moment';

class SearchResultCell extends React.Component {

  render() {
    return (
      <div className="post-cell card cell mb-2" onClick={() => this.props.showConversation(this.props.result.id)}>
        <div className="p-3">
          <AppReadMore length={200} text={this.props.result.content} />
          <div className="small time-ago text-muted">{moment(this.props.result.created_at).fromNow()}</div>
          <PostActions
            post={this.props.result} 
            handleShowComments={() => this.props.showConversation(this.props.result.id)}
          />
        </div>
      </div>
    );
  }
}

export default SearchResultCell;
