import React from 'react';
import {
  withRouter
} from 'react-router-dom';

class TopicCell extends React.Component {

  render() {
    return (
      <div className="col-12 col-md-6 col-lg-4">
        <div className="justify-content-center card cell topic-cell mb-4" onClick={this.props.showTopic}>
          <div className="py-5 text-center justify-content-center d-flex">
            <h1 className="display-4 mb-0">{this.props.topic.title}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TopicCell);