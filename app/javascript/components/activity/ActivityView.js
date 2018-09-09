import React from 'react';
import PageHeader from '../common/PageHeader';
import {withRouter} from 'react-router-dom';

class ActivityView extends React.Component {
  render() {
    return (
      <div className="page-wrap">
        <PageHeader title="Activity" />
      </div>
    );
  }
}

export default withRouter(ActivityView);
