import React from 'react';

class SearchResultCell extends React.Component {
  render() {
    return (
      <div className="search-result-cell card cell mb-2">
        <div className="p-3">
          {this.props.result.content}
        </div>
      </div>
    );
  }
}

export default SearchResultCell;
