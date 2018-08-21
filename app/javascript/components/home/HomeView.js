import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPosts,
} from '../../actions';

class HomeView extends React.Component {
  componentDidMount() {
    // Fetch posts
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4">Home</h1>        
      </div>
    );
  }
}

function actions(dispatch) {
  return {
    fetchPosts: () => { dispatch(fetchPosts()) },
  };
}

function select(store) {
  return {
    user: store.user,
  };
}

export default connect(select, actions)(HomeView);
