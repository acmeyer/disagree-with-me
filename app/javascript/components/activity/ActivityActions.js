import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import { 
  Tooltip,
} from "@blueprintjs/core";

class ActivityActions extends React.Component {
  markAsRead = (e) => {
    e.stopPropagation();
    this.props.handleMarkRead(this.props.notification);
  }

  markAsUnread = (e) => {
    e.stopPropagation();
    this.props.handleMarkUnread(this.props.notification);
  }

  delete = (e) => {
    e.stopPropagation();
    this.props.handleDelete(this.props.notification);
  }

  render() {
    let toggleRead;
    if (this.props.notification.status === 'unread') {
      toggleRead = (
        <div className="action px-3" onClick={(e) => this.markAsRead(e)}>
          <Tooltip content="Mark as Read" position="top">
            <span className={`action-icon`}><i className={`fas fa-check`} /></span>
          </Tooltip>
        </div>
      );
    } else {
      toggleRead = (
        <div className="action px-3" onClick={(e) => this.markAsUnread(e)}>
          <Tooltip content="Mark as Unread" position="top">
            <span className={`action-icon`}><i className={`far fa-envelope-open`} /></span>
          </Tooltip>
        </div>
      );
    }
    return (
      <div className="activity-actions border-left d-flex flex-column justify-content-around">
        {toggleRead}
        <div className="action px-3" onClick={(e) => this.delete(e)}>
          <Tooltip content="Delete" position="top">
            <span className={`action-icon`}><i className={`far fa-trash-alt`} /></span>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withRouter(ActivityActions);