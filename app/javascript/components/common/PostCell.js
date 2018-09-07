import React from 'react';
import AppReadMore from './AppReadMore';
import PostActions from './PostActions';
import {
  withRouter
} from 'react-router-dom';
import moment from  'moment';
import {connect} from 'react-redux';

import {
  showLoginModal,
} from '../../actions';

class PostCell extends React.Component {
  showPost = (e) => {
    this.props.history.push(`/conversations/${this.props.post.id}`);
  }

  showPostComments = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.history.push(`/conversations/${this.props.post.id}`);
    } else {
      this.props.showLoginModal();
    }
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
          <PostActions 
            post={this.props.post} 
            handleShowComments={this.showPostComments}
          />
        </div>
        {this.renderTopResponse()}
      </div>
      );
  }
}

function actions(dispatch) {
  return {
    showLoginModal: () => { dispatch(showLoginModal()) },
  };
}

export default withRouter(connect(null, actions)(PostCell));