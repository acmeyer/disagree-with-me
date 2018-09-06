import React from 'react';
import {connect} from 'react-redux';
import { 
  Menu, 
  MenuItem,
  Popover, 
  Position,
  Tooltip,
} from "@blueprintjs/core";
import {
  showLoginModal,
  toggleResponseUpvote,
  thankResponse,
} from '../../actions';

class ResponseActions extends React.Component {

  toggleUpvote = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      this.props.toggleResponseUpvote(this.props.response);
    } else {
      this.props.showLoginModal();
    }
  }

  thank = (e) => {
    e.stopPropagation();
    if (this.props.user.loggedIn) {
      // Make sure user is author
      if (this.props.response.is_author) {
        this.props.thankResponse(this.props.response);
      }
    } else {
      this.props.showLoginModal();
    }
  }

  showMoreOptions = (e) => {
    e.stopPropagation();
  }

  renderMoreOptionsMenu = () => {
    return (
      <Menu>
        <MenuItem text="Report This Response" />
      </Menu>
    );
  }

  render() {
    let {response} = this.props;
    return (
      <div className="cell-actions flex-row d-flex mt-3">
        <div className="action pr-4" onClick={this.toggleUpvote}>
          <Tooltip content="Upvote" position="top">
            <span className={`action-icon ${response.upvoted ? 'active' : null}`}><i className={`fas fa-arrow-up`} /></span>
          </Tooltip>
          <span className={`action-count ${response.upvoted ? 'active' : null}`}>{response.upvotes_count > 0 && response.upvotes_count}</span>
        </div>
        <div  className="action" onClick={this.showMoreOptions}>
          <Popover content={this.renderMoreOptionsMenu()} position={Position.RIGHT_CENTER}>
            <Tooltip content="More" position="top">
              <span className={`action-icon`}><i className="fas fa-ellipsis-h" /></span>
            </Tooltip>
          </Popover>
        </div>
      </div>
    )
  }
}

function actions(dispatch) {
  return {
    showLoginModal: () => { dispatch(showLoginModal()) },
    toggleResponseUpvote: (response) => { dispatch(toggleResponseUpvote(response)) },
    thankResponse: (response) => { dispatch(thankResponse(response)) },
  };
}

function select(store) {
  return {
    user: store.user,
  };
}

export default connect(select, actions)(ResponseActions);