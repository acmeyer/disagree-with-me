import React from 'react';
import AppReadMore from './AppReadMore';
import PostActions from './PostActions';
import {
  withRouter
} from 'react-router-dom';
import moment from  'moment';

class PostCell extends React.Component {

  renderTopResponse = () => {
    let {top_response} = this.props.post;
    if (this.props.showTopResponse && top_response) {
      return (
        <div className="top-response p-3 bg-white">
          <div className="heading text-uppercase small">
            <i className="fas fa-star mr-1 text-warning" />
            Top Response
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

  render() {
    return (
      <div className="card cell post-cell mb-2" onClick={this.props.showPost}>
        <div className="p-3">
          <AppReadMore length={300} text={this.props.post.content} />
          <div className="small time-ago text-muted">{moment(this.props.post.created_at).fromNow()}</div>
          <PostActions 
            post={this.props.post} 
            handleShowComments={this.props.showPostComments}
          />
        </div>
        {this.renderTopResponse()}
      </div>
    );
  }
}

export default withRouter(PostCell);