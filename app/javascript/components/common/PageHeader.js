import React from 'react';

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header mt-3">
        <div className="container">
          <div className="d-flex">
            <h3 className="m-0 flex-fill">{this.props.title}</h3>
            {this.props.headerAction}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default PageHeader;
