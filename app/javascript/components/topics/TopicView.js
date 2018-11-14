import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import LoadingView from '../common/LoadingView';
import PostCell from '../common/PostCell';
import { 
  Button,
  Menu,
  Popover,
  MenuItem,
} from "@blueprintjs/core";

import {
  showLoginModal,
  fetchPosts,
  showTopic,
} from '../../actions';

import _ from 'lodash';

class TopicView extends React.Component {
  constructor(props) {
    super(props);

    let {topicId} = this.props.match.params;

    this.state = {
      loading: false,
      topic: _.find(this.props.topics, (t) => t.id.toString() === topicId),
    };
  }

  componentWillMount() {
    let {topicId} = this.props.match.params;
    this.fetchNewPosts(topicId);
  }

  componentDidMount() {
    let {topicId} = this.props.match.params;
    mixpanel.track('Viewed Topic Page', {topic_id: topicId});
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.id, prevProps.user.id)) {
      let {topicId} = this.props.match.params;
      this.fetchNewPosts(topicId);
    }
  }

  fetchNewPosts(topicId) {
    this.props.fetchPosts(1, topicId);
  }

  showPost = (post) => {
    this.props.history.push(`/conversations/${post.id}`);
  }

  showPostComments = (e, post) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.history.push(`/conversations/${post.id}`);
    } else {
      this.props.showLoginModal('login');
    }
  }

  handleLoadMorePosts = () => {
    const page = this.props.page + 1;
    const {topic} = this.state;
    this.props.fetchPosts(page, topic);
    mixpanel.track('Load More Posts', {page: 'topic', topic: topic});
  }

  renderPost = (post) => {
    return (
      <PostCell 
        key={post.id} 
        user={this.props.user} 
        post={post} 
        showTopResponse 
        showPost={() => this.showPost(post)}
        showPostComments={(e) => this.showPostComments(e, post)}
      />
    );
  }

  updateSortBy = (value) => {
    this.setState({sortBy: value});
    this.props.search(this.state.searchQuery, value);
    mixpanel.track('Sorted Search', {sortBy: value});
  }

  sortByMenu = () => {
    const sortByOptions = [
      'Relevance',
      'Most Popular',
      'Most Recent'
    ]
    return (
      <Menu>
        {sortByOptions.filter(o => o !== this.state.sortBy).map(option => {
          return (
            <MenuItem key={option} text={option} onClick={() => this.updateSortBy(option)} />
          );
        })}
      </Menu>
    );
  }

  renderSearchFilters = () => {
    return (
      <div className="search-filters">
        <div className="d-flex justify-content-between align-items-center flex-row">
          <div className="text-right">
            <span className="pr-2">Sort by:</span>
            <Popover content={this.sortByMenu()} position="bottom">
              <Button text={this.state.sortBy} rightIcon="caret-down" />
            </Popover>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let content, loadMore;

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      if (this.props.moreResults) {
        loadMore = (
          <div className="load-more text-center m-3">
            <Button 
              onClick={this.handleLoadMorePosts}
              loading={this.props.loadingMore}
              text="Load More"
            />
          </div>
        );
      }
      content = (
        <div>
          {this.props.posts.map(this.renderPost)}
          {loadMore}
        </div>
      );
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-9">
              <h1 className="display-4 topic-title mt-3">{this.state.topic && this.state.topic.title}</h1>
              <hr/>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function actions(dispatch) {
  return {
    showTopic: (topic) => { dispatch(showTopic(topic)) },
    showLoginModal: (view) => { dispatch(showLoginModal(view)) },
    fetchPosts: (page, options) => { dispatch(fetchPosts(page, options)) },
  };
}

function select(store) {
  return {
    isLoading: store.posts.loading,
    user: store.user,
    posts: store.posts.list,
    topics: store.topics.list,
    page: store.posts.page,
    moreResults: store.posts.moreResults,
    loadingMore: store.posts.loadingMore,
  };
}

export default withRouter(connect(select, actions)(TopicView));
