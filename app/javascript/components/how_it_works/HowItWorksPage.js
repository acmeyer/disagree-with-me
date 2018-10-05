import React from 'react';
import {Link} from 'react-router-dom';

class HowItWorksPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="page-wrap how-it-works">
        <div className="container mt-3">
          <h1 className="mb-3 text-center">How Disagree with Me Works</h1>   
          <p className="lead">Disagree with Me is a place to seek out and provide opposing viewpoints. It’s a place to help you improve your thinking and broaden your perspective.</p>
          <p className="lead">Here’s how it works.</p>
          <h2 id="accountability">Accountability</h2>
          <p>Anyone on the internet can browse Disagree with Me and read every conversation. But only those who sign up can participate by posting ideas or opinions and providing opposing viewpoints to others.</p>
          <p>We require you to sign up in order to participate for two main reasons:</p>
          <ol>
            <li>It helps protects all users from the annoyance of spam and bots.</li>
            <li>It provides a mechanism for accountability. Disagree with Me is not a place for people who act like jerks on the internet. If you act like a jerk, then your account may be disabled.</li>
          </ol>
          <p>Anyone who is signed up for Disagree with Me can also help in policing users by reporting any content that they think violates are <Link to="/terms">terms</Link>. This helps create a place where many people enjoy participating.</p>
          <h2 id="anonymity">Anonymity</h2>
          <p>Although an account is required to participate on Disagree with Me, no emails or usernames will be shown next to any post or response. The reason for this is because an important concept in creating a place where dissent can thrive is by separating a viewpoint from the person holding that viewpoint.</p>
          <p>By creating a separation between the person and the viewpoint, it prevents others from disagreeing solely based on the person who said it. Disagree with Me is a network where the idea is the center, not the people.</p>
          <h2 id="filtering">Filtering</h2>
          <p>Creating a place where people are encouraged to disagree and do so anonymously has the potential of becoming a cesspool on the internet. Besides <a href="#accountability">accountability</a>, another way Disagree with Me prevents this from happening is by enabling tools for better filtering.</p>
          <p>One of the unique mechanism that separates Disagree with Me from other online discussion sites, is that the users of the site provide the filtering of content. We do this by giving anyone who posts a new idea or opinion control over the most helpful responses to their post.</p>
          <p>As people response to your opinion, you have the chance to Thank them for their response. By Thanking a user for their response, you provide a signal to other users that their viewpoint was helpful to you.</p>
          <h2 id="participation">Participation</h2>
          <p>In order to create a place where the content is engaging, we also have mechanisms in place to encourage participation. Sites are best when lots of people are participating and interacting with each other. This is especially true in network-style applications.</p>
          <p>So on Disagree with Me, any post who’s author has become inactive for more than a week, will automatically thank responders that have received upvotes from the community. This ensures that anyone who posts an opinion and then leaves the site for good, can still create an active and engaging conversation. This also provides insurance to responders that even if a post’s author is not participating, their response could still be shown on the site and become a top response for others to see.</p>
          <h2 id="support">Support</h2>
          <p>If you still have any questions on how the site works or you ever run into any issues while using the site, please don’t hesitate to reach out to us at <a href="mailto:support@disagreewithme.app">support@disagreewithme.app</a>.</p>
          <p>You can also read more about why the site was created on our <Link to="/about">About page</Link>.</p>
          <p>Thanks for checking the site out and be sure to participate! You might be really surprised by what you learn.</p>
        </div>
      </div>
    );
  }
}

export default HowItWorksPage;                            