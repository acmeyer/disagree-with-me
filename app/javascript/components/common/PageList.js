import React from 'react';

class PageList extends React.Component {
  render() {
    return (
      <div className="page-list container justify-content-center mt-3">
        {this.props.children}
      </div>
      );
  }
}

export default PageList;