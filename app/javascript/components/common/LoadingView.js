import React from 'react';
import LoadingIndicator from 'react-loading-indicator';

class LoadingView extends React.Component {
  render() {
    return (
      <div className="loading-view text-center justify-content-center p-5">
        <LoadingIndicator />
      </div>
      );
  }
}

export default LoadingView;