import React from 'react';
import {
  Link,
} from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="text-center my-3">
          <h1 className="display-4">404</h1>
          <div className="lead">We're sorry but it looks like you try navigating to a page that doesn't exist.</div>
          <div className="text-center my-3">
            <Link to="/">Go to Home Page</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
