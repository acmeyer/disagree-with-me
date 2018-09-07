import React from 'react';
import {connect} from 'react-redux';
import { 
  Menu, 
  MenuItem,
  Popover, 
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
      this.props.thankResponse(this.props.response);
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

  renderThankExplaination = () => {
    let message = this.props.response.is_post_author
      ? 'As the post\'s author, you have the ability to thank or not thank a response. Thanked responses will get more prominance throughout the app. This is our way of filtering the best and most relevant content.'
      : 'Indicates if this response has been thanked by the post\'s author. This is our way of filtering for the best and most relevant content.';
    return (
      <div className="p-3">
        <h6>Thanked/Not Thanked</h6>
        <p className="mb-0">{message}</p>
      </div>
    )
  }

  renderThankAction = () => {
    let {response} = this.props;
    if (response.is_post_author) {
      let thank_text = response.author_thanked ? 'Thanked' : 'Thank';
    
      return (
        <div className="action pr-4" onClick={response.author_thanked ? null : this.thank }>
          <Popover 
            interactionKind="hover"
            content={this.renderThankExplaination()} 
            position="top"
          >
            <div>
              <span className={`action-icon ${response.author_thanked ? 'active' : null}`}><i className={`fas fa-check`} /></span>
              <span className={`action-text ${response.author_thanked ? 'active' : null} ml-2 small`}>{thank_text}</span>
            </div>
          </Popover>
        </div>
      );
    } else {
      let thank_text = response.author_thanked ? 'Thanked' : 'Not Thanked';
    
      return (
        <div className="action pr-4">
          <Popover 
            interactionKind="hover"
            content={this.renderThankExplaination()} 
            position="top"
          >
            <div>
              <span className={`action-icon ${response.author_thanked ? 'active' : null}`}><i className={`fas fa-check`} /></span>
              <span className={`action-text ${response.author_thanked ? 'active' : null} ml-2 small`}>{thank_text}</span>
            </div>
          </Popover>
        </div>
      )
    }
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
        {this.renderThankAction()}
        <div  className="action" onClick={this.showMoreOptions}>
          <Popover content={this.renderMoreOptionsMenu()} position="bottom">
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