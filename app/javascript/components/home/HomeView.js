import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import LoadingView from '../common/LoadingView';
import PostCell from '../common/PostCell';
import { 
  NonIdealState, 
  Button,
  Menu,
  Popover,
  MenuItem,
} from "@blueprintjs/core";

import {
  showLoginModal,
  fetchPosts,
  showComposeView,
  search,
  clearSearch,
} from '../../actions';

import queryString from 'query-string';
import _ from 'lodash';

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    const searchParams = queryString.parse(this.props.location.search);

    this.state = {
      searchQuery: searchParams.query || '',
      sortBy: searchParams.sortBy || 'Relevance',
    };
  }

  componentDidMount() {
    // Fetch posts
    this.fetchNewPosts();

    // Show login if coming to login page and not logged in yet
    const currentUrl = this.props.match.url;
    if (currentUrl === '/login' && !this.props.user.loggedIn) {
      this.props.showLoginModal();
      mixpanel.track('Shown Login Modal', {from: 'home page'});
    } else if (currentUrl === '/signup' && !this.props.user.loggedIn) {
      this.props.showLoginModal('signup');
      mixpanel.track('Shown Signup Modal');
    } else if (currentUrl === '/reset_password' && !this.props.user.loggedIn) {
      this.props.showLoginModal('reset_password');
      mixpanel.track('Shown Reset Password Modal');
    }

    mixpanel.track('Viewed Home Page');
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.id, prevProps.user.id)) {
      this.fetchNewPosts();
    }
  }

  showPost = (post) => {
    if (this.state.searchQuery !== '') {
      this.props.history.push(`?query=${this.state.searchQuery}&sortBy=${this.state.sortBy}`);
    }
    this.props.history.push(`/conversations/${post.id}`);
  }

  showPostComments = (e, post) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.history.push(`/conversations/${post.id}`);
    } else {
      this.props.showLoginModal();
    }
  }

  fetchNewPosts = () => {
    this.props.fetchPosts(1, {random: true});
  }

  handleCreate = () => {
    if (this.props.user.loggedIn) {
      this.props.showComposeView();
    } else {
      this.props.showLoginModal();
    }
  }

  handleLoadMorePosts = () => {
    const page = this.props.page + 1;
    const currentUrl = this.props.match.url;
    if (currentUrl === '/latest') {
      this.props.fetchPosts(page, {latest: true});
    } else if (currentUrl === '/popular') {
      this.props.fetchPosts(page, {popular: true});
    } else {
      this.props.fetchPosts(page);
    }
    mixpanel.track('Load More Posts', {page: 'home', list: currentUrl === '/popular' ? 'popular' : 'latest'});
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

  updateSearch = (value) => {
    this.setState({searchQuery: value});
    this.props.search(value);
    mixpanel.track('Perform Search', {query: value});
  }

  updateSortBy = (value) => {
    this.setState({sortBy: value});
    this.props.search(this.state.searchQuery, value);
    mixpanel.track('Sorted Search', {sortBy: value});
  }

  clearSearch = () => {
    this.setState({searchQuery: ''});
    this.props.history.push('/');
    this.props.clearSearch();
    this.input.focus();
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
          <div>
            Results for: <strong>{this.state.searchQuery}</strong>
            <span className="px-2">|</span>
            <a href="#" onClick={this.clearSearch}>Clear</a>
          </div>
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

  renderSearchInput = () => {
    return (
      <div className="search-box-wrap my-3">
        <div className="form-group">
          <div className="search-input-wrap">
            <input
              ref={(input) => { this.input = input; }}
              autoComplete="off"
              type="text" 
              className="form-control form-control-lg" 
              id="search-input" 
              placeholder="Search for topics or keywords..."
              value={this.state.searchQuery}
              onChange={(e) => this.updateSearch(e.target.value)}
            />
            <i className="fas fa-search text-muted search-icon" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let content, searchFilters;

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      if (this.state.searchQuery !== '') {
        searchFilters = this.renderSearchFilters();
        if (this.props.searchIsLoading) {
          content = <LoadingView />;
        } else if (this.props.searchResults.length > 0) {
          content = this.props.searchResults.map(this.renderPost);
        } else {
          content = (
            <NonIdealState
              icon="issue"
              title="No results found"
              description={`Is this something you're interesting in?`}
              action={<Button text="Start a Discussion" onClick={() => this.handleCreate()} />}
            />
          );
        }
      } else {
        content = (
          <div>
            {this.props.posts.map(this.renderPost)}
          </div>
        );
      }
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-9">
              <div className="my-3 lead text-center">
                Seek out and provide opposing viewpoints
              </div>
              {this.renderSearchInput()}
              {searchFilters}
              {(this.state.searchQuery === '') &&
                <div className="text-center d-md-none">
                  <div>or</div>
                  <Button fill large className="create-post my-3" text="Create a Post" onClick={this.handleCreate} />
                </div>
              }
              <hr/>
              {content}
              {(this.state.searchQuery !== '' && this.props.searchResults.length > 0) &&
                <div className="powered-by-wrap text-right mt-3 text-muted text-uppercase small">
                  Powered by <a href="https://www.algolia.com" target="_blank">Algolia</a>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function actions(dispatch) {
  return {
    search: (query, sortBy) => { dispatch(search(query, sortBy)) },
    clearSearch: () => { dispatch(clearSearch()) },
    showComposeView: () => { dispatch(showComposeView()) },
    showLoginModal: (view) => { dispatch(showLoginModal(view)) },
    fetchPosts: (page, options) => { dispatch(fetchPosts(page, options)) },
  };
}

function select(store) {
  return {
    isLoading: store.posts.loading,
    user: store.user,
    posts: store.posts.list,
    page: store.posts.page,
    searchIsLoading: store.search.loading,
    searchResults: store.search.list,
  };
}

export default withRouter(connect(select, actions)(HomeView));
