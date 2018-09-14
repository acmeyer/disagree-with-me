import React from 'react';
import AppModal from './AppModal';

import {
  seenWelcomeMessage,
} from '../../actions';
import {connect} from 'react-redux';

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  close = () => {
    this.props.dispatch(seenWelcomeMessage());
  }

  render() {
    let {visible} = this.props;

    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Compose'}>
        <div className="welcome-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h3 className="mb-3">Welcome!</h3>
          <p>
            Welcome to Disagree with Me! Thanks for checking out the site. Here&rsquo;s a couple of things to help you better navigate the site.
          </p>
          <p>
            <strong>Latest/Popular Posts</strong>
          </p>
          <p>
            The Home page shows two lists of posts from users, Latest and Popular. You can think of these as a feed of posts to check out, but don&rsquo;t feel restricted to just this page.
          </p>
          <p>
            <strong>Search</strong>
          </p>
          <p>
            Search is where you&rsquo;ll be able to search for topics or keywords of any post on the site. This is where you should go if you&rsquo;re looking for specific topics to respond to.
          </p>
          <p><strong>Thanking Responses</strong></p>
          <p>
            One key difference between our site and other similar sites is that content is filtered by users. When you create a post on Disagree with Me, you&rsquo;re taking a big step in putting your ideas or opinions out there. So we wanted to reward posters by giving them the ability to filter their own content. The post&rsquo;s author has the ability to indicate the helpfulness of each response by &ldquo;thanking&rdquo; it. If a post&rsquo;s author thanks a response, it will show up in the Top Responses list in a Conversation.
          </p>
          <p>
            There&rsquo;s a few other things you can do on the site once you&rsquo;re logged in like Create, Bookmark, and Upvote posts and responses but we&rsquo;re guessing you already know how to do that so we won&rsquo;t explain it here.
          </p>
          <p>
            Thanks again for checking out the site and be sure to <a href="mailto:hi@disagreewithme.app" target="_blank">send us a note</a>&nbsp;if you have any feedback or think of ways to improve the site!
          </p>
          <p>
            Cheers to thinking better!
          </p>
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    visible: !store.user.seenWelcomeMessage,
  };
}

export default connect(select)(WelcomeModal);