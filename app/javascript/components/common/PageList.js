import React from 'react';

class PageList extends React.Component {
  render() {
    return (
      <div className="page-list mt-3">
        <div className="container">
          <div className="card">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default PageList;