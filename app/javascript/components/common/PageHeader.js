import React from 'react';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header mt-3">
        <div className="container">
          <h1 className="display-4 text-white m-0">{this.props.title}</h1>        
        </div>
      </div>
    );
  }
}

export default PageHeader;
