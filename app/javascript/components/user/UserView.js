import React from 'react';
import PageSubmenu from '../common/PageSubmenu';
import LoadingView from '../common/LoadingView';
import PageList from '../common/PageList';
import PostCell from '../common/PostCell';
import ResponseCell from '../common/ResponseCell';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { NonIdealState, Button } from "@blueprintjs/core";

import {
  fetchUserList,
} from '../../actions';

class UserView extends React.Component {
  componentWillMount() {
    let {list} = this.props.match.params;
    this.props.fetchUserList(list);
  }

  renderCell = (obj) => {
    if (obj.post_id) {
      return <ResponseCell key={obj.id} user={this.props.user} response={obj} />;
    } else {
      return <PostCell key={obj.id} user={this.props.user} post={obj} />;
    }
  }

  submenuLinks = () => {
    let {list} = this.props.match.params;
    return [
      {
        active: list === 'bookmarks',
        href: '/me/bookmarks',
        title: 'My Bookmarks'
      },
      {
        active: list === 'posts',
        href: '/me/posts',
        title: 'My Posts'
      },
      {
        active: list === 'responses',
        href: '/me/responses',
        title: 'My Responses'
      },
      {
        active: list === 'thanks',
        href: '/me/thanks',
        title: 'My Thanks'
      },
      {
        active: list === 'post-upvotes',
        href: '/me/post-upvotes',
        title: 'My Post Upvotes'
      },
      {
        active: list === 'response-upvotes',
        href: '/me/response-upvotes',
        title: 'My Response Upvotes'
      },
    ]
  }

  renderUserList = () => {
    let {data} = this.props;
    if (data.length > 0) {
      return data.map(this.renderCell);
    } else {
      let {list} = this.props.match.params;
      let message, description;
      if (list === 'bookmarks') {
        message = 'No bookmarks found!'
        description = 'When you bookmark a post, it will show here.'
      }
      if (list === 'posts') {
        message = 'No posts found!'
        description = 'When you create a post, it will show here.'
      }
      if (list === 'responses') {
        message = 'No responses found!'
        description = 'When you respond to a post, it will show here.'
      }
      if (list === 'thanks') {
        message = 'No thanks found!'
        description = 'When you thank a response, it will show here.'
      }
      if (list === 'post-upvotes') {
        message = 'No post upvotes found!'
        description = 'When you upvote a post, it will show here.'
      }
      if (list === 'response-upvotes') {
        message = 'No response upvotes found!'
        description = 'When you upvote a response, it will show here.'
      }
      return (
        <NonIdealState
          icon="issue"
          title={message}
          description={description}
        />
      )
    }
  }

  handleLoadMorePosts = () => {
    const page = this.props.page + 1;
    let {list} = this.props.match.params;
    this.props.fetchUserList(list, page);
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
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <PageSubmenu links={this.submenuLinks()} />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
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

export default withRouter(connect(select, actions)(UserView));
