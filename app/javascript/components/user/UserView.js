import React from 'react';
import PageHeader from '../common/PageHeader';
import PageSubmenu from '../common/PageSubmenu';

class UserView extends React.Component {
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
    let currentPageTitle;
    if (list === 'bookmarks') {
      currentPageTitle = "Bookmarks";
    } else if (list === 'posts') {
      currentPageTitle = "Your Posts";
    } else if (list === 'responses') {
      currentPageTitle = "Your Responses";
    }

    return (
      <div className="page-wrap">
        <PageSubmenu links={this.submenuLinks()} />
        <PageHeader title={currentPageTitle} />
      </div>
    );
  }
}

export default UserView;
