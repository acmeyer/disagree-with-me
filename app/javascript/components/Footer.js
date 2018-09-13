import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {

  render() {
    return (
      <footer className="footer py-3">
        <div className="container">
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="small text-muted">&copy; Disagree with Me</div>
            <div className="footer-links">
              <div className="small link d-md-inline-block mr-3">
                <Link className="text-muted" to="/about">About</Link>
              </div>
              <div className="small link d-md-inline-block">
                <a className="text-muted" href="mailto:hi@disagreewithme.app" target="_blank">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
