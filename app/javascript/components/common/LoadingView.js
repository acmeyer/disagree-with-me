import React from 'react';
import { Spinner } from "@blueprintjs/core";

class LoadingView extends React.Component {
  render() {
    return (
      <div className="loading-view text-center justify-content-center p-5">
        <Spinner />
      </div>
      );
  }
}

export default LoadingView;