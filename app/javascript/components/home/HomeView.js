import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';
import LoadingView from '../common/LoadingView';
import PostCell from '../common/PostCell';

import {
  showLoginModal,
  fetchPosts,
} from '../../actions';

class HomeView extends React.Component {
  componentWillMount() {
    // Fetch posts
    const currentUrl = this.props.match.url;
    if (currentUrl === '/latest') {
      this.props.fetchPosts(1, {latest: true});
    } else if (currentUrl === '/popular') {
      this.props.fetchPosts(1, {popular: true});
    } else {
      this.props.fetchPosts(1);
    }

    // Show login if coming to login page and not logged in yet
    if (currentUrl === '/login' && !this.props.user.loggedIn) {
      this.props.showLoginModal();
    }
  }

  submenuLinks = () => {
    const currentUrl = this.props.match.url;
    return [
      {
        active: currentUrl === '/' || currentUrl === '/login',
        href: '/',
        title: 'Trending',
        icon: 'chart-line'
      },
      {
        active: currentUrl === '/latest',
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
    let content;

    if (this.props.isLoading) {
      content = <LoadingView />;
    } else {
      content = this.props.posts.map(this.renderPost);
    }

    return (
      <div className="page-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <PageSubmenu links={this.submenuLinks()} />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <PageList>
                {content}
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
    showLoginModal: () => { dispatch(showLoginModal()) },
    fetchPosts: (page, options) => { dispatch(fetchPosts(page, options)) },
  };
}

function select(store) {
  return {
    isLoading: store.posts.loading,
    user: store.user,
    posts: store.posts.list,
  };
}

export default withRouter(connect(select, actions)(HomeView));
