import React from 'react';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header mt-3">
        <div className="container">
          <h3 className="m-0">{this.props.title}</h3>        
        </div>
      </div>
    );
  }
}

export default PageHeader;
