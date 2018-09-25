import React from 'react';
import LoadingView from '../common/LoadingView';
import PageList from '../common/PageList';
import PageHeader from '../common/PageHeader';
import PostCell from '../common/PostCell';
import ResponseCell from '../common/ResponseCell';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { NonIdealState, Button } from "@blueprintjs/core";

import {
  fetchUserList,
  showLoginModal,
} from '../../actions';

class BookmarksView extends React.Component {
  componentWillMount() {
    this.props.fetchUserList('bookmarks');
  }

  componentDidMount() {
    mixpanel.track('Viewed Bookmarks Page');
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

  renderCell = (obj) => {
    if (obj.post_id) {
      return <ResponseCell key={obj.id} user={this.props.user} response={obj} />;
    } else {
      return (
        <PostCell 
          key={obj.id} 
          user={this.props.user} 
          post={obj}
          showPost={() => this.showPost(obj)}
          showPostComments={(e) => this.showPostComments(e, post)}
        />
      );
    }
  }

  renderUserList = () => {
    let {data} = this.props;
    if (data.length > 0) {
      return data.map(this.renderCell);
    } else {
      return (
        <NonIdealState
          icon="issue"
          title="No bookmarks found!"
          description="When you bookmark a post, it will show here."
        />
      )
    }
  }

  handleLoadMorePosts = () => {
    const page = this.props.page + 1;
    this.props.fetchUserList('bookmarks', page);
    mixpanel.track('Load More Bookmarks');
  }

  render() {
    let content, loadMore;

    if (this.props.isLoading) {
      content = <LoadingView />
    } else {
      content = this.renderUserList();
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
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-9">
              <PageHeader title="Bookmarks" />
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
    showLoginModal: (view) => { dispatch(showLoginModal(view)) },
    fetchUserList: (list, page) => { dispatch(fetchUserList(list, page)) },
  };
}

function select(store) {
  return {
    isLoading: store.userList.loading,
    data: store.userList.list,
    moreResults: store.userList.moreResults,
    page: store.userList.page,
    loadingMore: store.userList.loadingMore,
    user: store.user,
  };
}

export default withRouter(connect(select, actions)(BookmarksView));
