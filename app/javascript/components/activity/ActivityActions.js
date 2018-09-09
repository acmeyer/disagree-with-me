import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import { 
  Tooltip,
} from "@blueprintjs/core";

class ActivityActions extends React.Component {
  markAsRead = () => {
    console.log('mark as read');
  }

  delete = () => {
    console.log('delete');
  }

  render() {
    return (
      <div className="cell-actions flex-row d-flex mt-3">
        <div className="action pr-4" onClick={this.markAsRead}>
          <Tooltip content="Mark as Read" position="top">
            <span className={`action-icon`}><i className={`fas fa-check`} /></span>
          </Tooltip>
        </div>
        <div className="action pr-4" onClick={this.delete}>
          <Tooltip content="Delete" position="top">
            <span className={`action-icon`}><i className={`fas fa-trash`} /></span>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withRouter(ActivityActions);