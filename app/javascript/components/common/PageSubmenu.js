import React from 'react';
import {
  Link,
} from 'react-router-dom';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="container">
        <ul className="page-submenu nav justify-content-center">
          {this.props.links.map(link => {
            return (
              <li key={link.href} className="nav-item">
                <Link to={link.href} className={`nav-link ${link.active ? 'active' : ''}`}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PageHeader;
