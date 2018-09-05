import React from 'react';
import AppReadMore from './AppReadMore';
import PostActions from './PostActions';
import moment from  'moment';
import {connect} from 'react-redux';

import {
  showConversation,
} from '../../actions';

class PostCell extends React.Component {
  showPost = (e) => {
    this.props.showConversation(this.props.post);
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

  render() {
    return (
      <div className="card cell post-cell mb-2" onClick={this.showPost}>
        <div className="p-3">
          <AppReadMore length={300} text={this.props.post.content} />
          <div className="small time-ago text-muted">{moment(this.props.post.created_at).fromNow()}</div>
          <PostActions post={this.props.post} />
        </div>
        {this.renderTopResponse()}
      </div>
      );
  }
}

function actions(dispatch) {
  return {
    showConversation: (post) => { dispatch(showConversation(post)) },
  };
}

export default connect(null, actions)(PostCell);