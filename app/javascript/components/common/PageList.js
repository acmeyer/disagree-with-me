import React from 'react';

class PageList extends React.Component {
  render() {
    return (
      <div className="page-list container justify-content-center mt-5">
        <div className="card">
          {this.props.children}
        </div>
      </div>
      );
  }
}

export default PageList;