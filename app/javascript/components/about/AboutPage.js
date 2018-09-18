import React from 'react';

class AboutPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="page-wrap">
        <div className="container mt-3 static-page-container">
          <h3 className="mb-3">About</h3>
          <p>Disagree with Me is a place to seek out and provide opposing viewpoints. The inspiration for this website comes from the growing prevalence of filter bubbles in today’s society, specifically on the internet. It is also something I personally find appealing, as I try to use this concept in my own life, both internally and externally, whenever thinking about some idea or opinion.</p>
          
          <p>The value of dissent is not a new concept. There are a lot of great examples of its use in military and business contexts (<a href="https://en.wikipedia.org/wiki/Red_team" target="_blank">red team</a>) and the US State Department (<a href="https://en.wikipedia.org/wiki/Dissent_Channel" target="_blank">Dissent Channel</a>). It’s effectiveness is also growing in awareness through its prominence in new books like <a href="https://www.amazon.com/Thinking-Bets-Making-Smarter-Decisions/dp/0735216355/" target="_blank">Thinking in Bets</a> and <a href="https://www.amazon.com/Defense-Troublemakers-Power-Dissent-Business/dp/0465096298/" target="_blank">In Defense of Troublemakers</a>.</p>

          <p>While you can find plenty of dissent and opposing viewpoints in plenty of places on the internet today, Twitter and Reddit come to mind, they all lack some of the key features that make dissent valuable: separating the opinion from the person and creating a place where dissent is encouraged.</p>

          <p>The biggest difference between Disagree with Me and other online forums is the noticeable absence of an association between users and their content. This was done on purpose. As noted above, one important concept in creating a place where dissent can thrive is by separating a viewpoint from the person holding that viewpoint. Something that has become apparent on sites like Twitter is that often the people and not the specific idea are attacked or a viewpoint is attacked because of the person holding the idea. So in order to try and avoid this from happening on Disagree with Me, you will find no users associated with any of the posts or responses found on the site. We’re trying to create a place where the idea is the center of the network, not the people.</p>

          <p>One of the biggest challenges with anonymity online has been abuse. It is a lot easier to attack and be an otherwise terrible person when you can hide online. We’re aware of this challenge and are planning to build tools and processes at the very start to avoid this site from becoming a cesspool of hateful comments like has happened in so many other places online. This is always a particularly challenging problem to solve, especially for a site that openly encourages disagreement and wants its users to share their different viewpoints, but we will do our best and hope our users will help us weed out the few bad apples that may exist. We plan on doing this by requiring all users to create an account, even though it won’t be public to others, in order to disable bad actors, and providing a way for anyone to report posts and responses that violate our terms.</p>

          <p>
            Some of the things we will have zero tolerance for on Disagree with Me include:
          </p>
          <ul>
            <li>Personal attacks of any kind</li>
            <li>Abusive language</li>
            <li>Completely off-topic remarks</li>
            <li>Inappropriate content</li>
          </ul>

          <p>We believe you can voice valuable dissent without having to succumb to any of the above and therefore will take action if we find anything that violates our terms. Outside of these topics, we plan on being very open to all kinds of opinion and viewpoints, even ones that may not be popular today.</p>

          <p>While we may not be perfect and acknowledge the challenge of building a productive anonymous platform online, we do think it is important enough to try and will do everything we can to see it succeed.</p>

          <p>Charlie Munger, Warren Buffett’s business partner of Berkshire Hathaway fame, has a great quote that outlines the goal of Disagree with Me pretty well:</p>
          
          <p className="px-3">“I never allow myself to have an opinion on anything that I don’t know the other side’s argument better than they do.”</p>
          
          <p>With that, I hope Disagree with Me can be a place where you go to improve your thinking and help others improve theirs.</p>
          
          <p>
            Thank you,
            <br/>
            Alex
          </p>
        </div>
      </div>
    );
  }
}

export default AboutPage;