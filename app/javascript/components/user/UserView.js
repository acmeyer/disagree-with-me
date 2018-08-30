import React from 'react';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';
import LoadingView from '../common/LoadingView';
import PageList from '../common/PageList';
import PostCell from '../common/PostCell';
import ResponseCell from '../common/ResponseCell';
import {connect} from 'react-redux';

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

  render() {
    let content;

    if (this.props.isLoading) {
      content = <LoadingView />
    } else {
      content = this.props.data.map(this.renderCell);
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
    fetchUserList: (list, page) => { dispatch(fetchUserList(list, page)) },
  };
}

function select(store) {
  return {
    isLoading: store.userList.loading,
    data: store.userList.list,
  };
}

export default connect(select, actions)(UserView);
