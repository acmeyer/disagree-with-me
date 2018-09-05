import React from 'react';
import {
  Link,
} from 'react-router-dom';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="container">
        <ul className="page-submenu nav flex-column mt-3">
          {this.props.links.map(link => {
            return (
              <li key={link.href} className="nav-item">
                <Link to={link.href} className={`nav-link ${link.active ? 'active' : ''}`}>
                  {link.icon && <span className="link-icon"><i className={`fas fa-${link.icon}`} /></span>}
                  <span className="link-text">{link.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PageHeader;
