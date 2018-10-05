import React from 'react';

class PrivacyPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="page-wrap">
        <div className="container mt-3">
          <h2 className="mb-3">Privacy Policy</h2>
          <p>Effective date: September 20, 2018</p>
          <p>Disagree with Me's Privacy Policy is below. In order to make things as easy to understand as possible, we have condensed everything into an easily digestable form.</p>
          <h4>What we collect from you</h4>
          <p>In order to run and improve the site, we collect data from you. The types of data we collect are:</p>
          <ul>
            <li>Personal Data: email address</li>
            <li>Cookies and Usage Data: browser type, browser version, pages visited, cookies for security proposes, etc.</li>
          </ul>
          <h4>How we use the data</h4>
          <p>The site uses the collected data for:</p>    
          <ul>
              <li>Improving the site</li>
              <li>Allowing you to use the site</li>
              <li>Understanding how you use the site in order to improve it</li>
              <li>Monitor the site's usage and detect and prevent technical issues</li>
          </ul>
          <h4>Security</h4>
          <p>We will make the best efforts possible to protect your data but be aware that we cannot guarantee its protection. We use the latest secure practices and collect very little personally identifiable information from you.</p>

          <h4>Analytics</h4>
          <p>We use Mixpanel as our analytics provider. Mixpanel is provided by Mixpanel Inc.</p>   
          <p>You can prevent Mixpanel from using your information for analytics purposes by opting-out. To opt-out of Mixpanel service, please visit this page: <a href="https://mixpanel.com/optout/">https://mixpanel.com/optout/</a></p>
          <p>For more information on what type of information Mixpanel collects, please visit the Terms of Use page of Mixpanel: <a href="https://mixpanel.com/terms/">https://mixpanel.com/terms/</a></p>

          <h4>Contact Us</h4>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: <a href="mailto:hi@disagreewithme.app">hi@disagreewithme.app</a></li>
          </ul>    
        </div>
      </div>
    );
  }
}

export default PrivacyPage;                            