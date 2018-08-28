import React from 'react';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import LoadingView from '../common/LoadingView';
import PageList from '../common/PageList';
import PostCell from '../common/PostCell';
// import ResponseCell from '../common/ResponseCell';
import {connect} from 'react-redux';

import {
  fetchUserBookmarks,
  fetchUserPosts,
  fetchUserResponses,
} from '../../actions';

class UserView extends React.Component {
  componentWillMount() {
    let {list} = this.props.match.params;
    if (list === 'bookmarks') {
      this.props.fetchUserBookmarks();
    } else if (list === 'posts') {
      this.props.fetchUserPosts();
    } else if (list === 'responses') {
      this.props.fetchUserResponses();
    }
  }

  renderCell = (obj) => {
    if (obj.post_id) {
      return <ResponseCell key={obj.id} response={obj} />;
    } else {
      return <PostCell key={obj.id} post={obj} />;
    }
  }

  submenuLinks = () => {
    let {list} = this.props.match.params;
    return [
      {
        active: list === 'bookmarks',
        href: '/me/bookmarks',
        title: 'Bookmarks'
      },
      {
        active: list === 'posts',
        href: '/me/posts',
        title: 'Posts'
      },
      {
        active: list === 'responses',
        href: '/me/responses',
        title: 'Responses'
      },
    ]
  }

  render() {
    let {list} = this.props.match.params;
    let currentPageTitle, content;
    if (list === 'bookmarks') {
      currentPageTitle = "Bookmarks";
    } else if (list === 'posts') {
      currentPageTitle = "Your Posts";
    } else if (list === 'responses') {
      currentPageTitle = "Your Responses";
    }

    if (this.props.isLoading) {
      content = <LoadingView />
    } else {
      content = this.props.data.map(this.renderCell);
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
    fetchUserBookmarks: (page) => { dispatch(fetchUserBookmarks(page)) },
    fetchUserPosts: (page) => { dispatch(fetchUserPosts(page)) },
    fetchUserResponses: (page) => { dispatch(fetchUserResponses(page)) },
  };
}

function select(store) {
  return {
    isLoading: store.userList.loading,
    data: store.userList.list,
  };
}

export default connect(select, actions)(UserView);
