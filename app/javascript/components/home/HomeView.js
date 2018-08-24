import React from 'react';
import {connect} from 'react-redux';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';
import LoadingView from '../common/LoadingView';
import PostCell from '../common/PostCell';

import {
  fetchPosts,
} from '../../actions';

class HomeView extends React.Component {
  componentDidMount() {
    // Fetch posts
    const currentUrl = this.props.match.url;
    if (currentUrl === '/') {
      this.props.fetchPosts();
    } else if (currentUrl === '/latest') {
      this.props.fetchPosts(1, {latest: true});
    } else if (currentUrl === '/popular') {
      this.props.fetchPosts(1, {popular: true});
    }
  }

  submenuLinks = () => {
    const currentUrl = this.props.match.url;
    return [
      {
        active: currentUrl === '/',
        href: '/',
        title: 'Trending'
      },
      {
        active: currentUrl === '/latest',
        href: '/latest',
        title: 'Latest'
      },
      {
        active: currentUrl === '/popular',
        href: '/popular',
        title: 'Popular'
      },
    ]
  }

  renderPost = (post) => {
    return <PostCell key={post.id} post={post} />;
  }

  render() {
    let currentPageTitle, content;
    if (this.props.match.url === '/popular') {
      currentPageTitle = "Popular";
    } else if (this.props.match.url === '/latest') {
      currentPageTitle = "Latest";
    } else {
      currentPageTitle = "Trending";
    }

    if (this.props.isLoading) {
      content = <LoadingView />
    } else {
      content = this.props.posts.map(this.renderPost);
    }

    return (
      <div className="page-wrap">
        <PageSubmenu links={this.submenuLinks()} />
        <PageHeader title={currentPageTitle} />
        <PageList>
          {content}
        </PageList>
      </div>
    );
  }
}

function actions(dispatch) {
  return {
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

export default connect(select, actions)(HomeView);
