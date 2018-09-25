import React from 'react';
import AppReadMore from './AppReadMore';
import ResponseActions from './ResponseActions';
import {
  withRouter
} from 'react-router-dom';
import moment from  'moment';
import {connect} from 'react-redux';

import {
  showLoginModal,
} from '../../actions';

class ResponseCell extends React.Component {
  showPost = (e) => {
    this.props.history.push(`/conversations/${this.props.response.post_id}`);
  }

  render() {
    return (
      <div className="card cell response-cell p-3 mb-2" onClick={this.showPost}>
        <AppReadMore length={150} text={this.props.response.content} />
        <div className="small time-ago text-muted">{moment(this.props.response.created_at).fromNow()}</div>
        <ResponseActions response={this.props.response} />
      </div>
      );
  }
}

function actions(dispatch) {
  return {
    showLoginModal: (view) => { dispatch(showLoginModal(view)) },
  };
}

export default withRouter(connect(null, actions)(ResponseCell));