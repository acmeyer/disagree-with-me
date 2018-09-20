import React from 'react';

class TermsPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="page-wrap">
        <div className="container mt-3">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-9">
              <h3 className="mb-3">Terms and Conditions</h3>
              <p>The terms and conditions for Disagree with Me are simple. By signing up to use our site, you agree to behave in a respectful manner to other users and not violate the following conditions:</p>
              <ul>
                <li>Personally attack any individual for anything related to themselves and not their ideas.</li>
                <li>Use abusive language.</li>
                <li>Post completely off-topic remarks that have nothing to do with the conversation at hand.</li>
                <li>Use inappropriate content anywhere on the site.</li>
              </ul>
              <p>If you violate any of the above conditions, we reserve the right to delete or disable your account and take down any content you may have posted.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsPage;