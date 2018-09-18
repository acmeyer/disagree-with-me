import React from 'react';
import PageSubmenu from '../common/PageSubmenu';
import LoadingView from '../common/LoadingView';
import PageList from '../common/PageList';
import PageHeader from '../common/PageHeader';
import PostCell from '../common/PostCell';
import ResponseCell from '../common/ResponseCell';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import { NonIdealState, Button } from "@blueprintjs/core";

import {
  fetchUserList,
} from '../../actions';

const userLists = [
  'posts',
  'responses',
  'thanks',
  'post-upvotes',
  'response-upvotes'
];

class UserView extends React.Component {
  componentDidMount() {
    let {list} = this.props.match.params;
    if (userLists.includes(list)) {
      this.props.fetchUserList(list);
      mixpanel.track('Viewed User List Page', {list});
    }
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
        active: list === 'posts',
        href: '/me/posts',
        title: 'Posts'
      },
      {
        active: list === 'responses',
        href: '/me/responses',
        title: 'Responses'
      },
      {
        active: list === 'thanks',
        href: '/me/thanks',
        title: 'Thanks'
      },
      {
        active: list === 'post-upvotes',
        href: '/me/post-upvotes',
        title: 'Post Upvotes'
      },
      {
        active: list === 'response-upvotes',
        href: '/me/response-upvotes',
        title: 'Response Upvotes'
      },
    ]
  }

  getPageTitle = () => {
    let {list} = this.props.match.params;
    if (list === 'posts') {
      return "My Posts";
    }
    if (list === 'responses') {
      return "My Responses";
    }
    if (list === 'thanks') {
      return "My Thanks";
    }
    if (list === 'post-upvotes') {
      return "My Post Upvotes";
    }
    if (list === 'response-upvotes') {
      return "My Response Upvotes";
    }
  }

  renderUserList = () => {
    let {data} = this.props;
    if (data.length > 0) {
      return data.map(this.renderCell);
    } else {
      let {list} = this.props.match.params;
      let message, description;
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
    mixpanel.track('Load More Posts', {page: 'user list', list: list});
  }

  render() {
    let content, loadMore;
    let {list} = this.props.match.params;
    if (!userLists.includes(list)) {
      return (
        <Redirect
          to={{pathname: "/me/posts"}}
        />
      );
    }

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
            <PageHeader title={this.getPageTitle()} />
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
