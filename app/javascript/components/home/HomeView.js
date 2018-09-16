import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';
import LoadingView from '../common/LoadingView';
import PostCell from '../common/PostCell';
import { Button } from "@blueprintjs/core";

import {
  showLoginModal,
  fetchPosts,
  showComposeView,
} from '../../actions';

import _ from 'lodash';

class HomeView extends React.Component {
  componentWillMount() {
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
  }

  componentDidMount() {
    const currentUrl = this.props.match.url;
    const list = currentUrl === '/popular' ? 'popular' : 'latest';
    mixpanel.track('Viewed Home Page', {list});
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.user.id, prevProps.user.id)) {
      this.fetchNewPosts();
    }
  }

  fetchNewPosts = () => {
    const currentUrl = this.props.match.url;
    if (currentUrl === '/latest') {
      this.props.fetchPosts(1, {latest: true});
    } else if (currentUrl === '/popular') {
      this.props.fetchPosts(1, {popular: true});
    } else {
      this.props.fetchPosts(1);
    }
  }

  submenuLinks = () => {
    const currentUrl = this.props.match.url;
    return [
      // {
      //   active: currentUrl === '/' || currentUrl === '/login',
      //   href: '/',
      //   title: 'Trending',
      //   icon: 'chart-line'
      // },
      {
        active: currentUrl === '/' || currentUrl === '/latest' || currentUrl === '/login',
        href: '/latest',
        title: 'Latest',
        icon: 'clock'
      },
      {
        active: currentUrl === '/popular',
        href: '/popular',
        title: 'Popular',
        icon: 'star'
      },
    ]
  }

  handleCreate = () => {
    if (this.props.user.loggedIn) {
      this.props.showComposeView();
    } else {
      this.showLogin();
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
      />
    );
  }

  render() {
    let content, loadMore;

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      content = this.props.posts.map(this.renderPost);
      if (this.props.moreResults) {
        loadMore = (
          <div className="load-more text-center m-3">
            <Button 
              onClick={this.handleLoadMorePosts}
              loading={this.props.loadingMore}
              text="Load More"
            />
          </div>
        )
      }
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <PageSubmenu links={this.submenuLinks()} />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <div className="create-post card d-md-none p-3 text-muted mt-3" onClick={this.handleCreate}>
                What are you seeking feedback on?
              </div>
              <PageList>
                {content}
                {loadMore}
              </PageList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function actions(dispatch) {
  return {
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
    moreResults: store.posts.moreResults,
    page: store.posts.page,
    loadingMore: store.posts.loadingMore,
  };
}

export default withRouter(connect(select, actions)(HomeView));
