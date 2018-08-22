import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPosts,
} from '../../actions';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import PageList from '../common/PageList';

class HomeView extends React.Component {
  componentDidMount() {
    // Fetch posts
    this.props.fetchPosts();
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

  render() {
    let currentPageTitle;
    if (this.props.match.url === '/popular') {
      currentPageTitle = "Popular";
    } else if (this.props.match.url === '/latest') {
      currentPageTitle = "Latest";
    } else {
      currentPageTitle = "Trending";
    }
    return (
      <div className="page-wrap">
        <PageSubmenu links={this.submenuLinks()} />
        <PageHeader title={currentPageTitle} />
        <PageList />
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
