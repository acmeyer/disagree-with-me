import React from 'react';
import SearchResultCell from './SearchResultCell';
import LoadingView from '../common/LoadingView';
import {
  NonIdealState,
} from '@blueprintjs/core';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  search,
  clearSearch,
} from '../../actions';

class SearchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    mixpanel.track('Viewed Search Page');
  }

  showConversation = (postId) => {
    this.props.history.push(`/conversations/${postId}`);
  }

  renderSearchResults = () => {
    let content;
    if (this.props.loading) {
      content = <LoadingView />;
    } else {
      if (this.state.searchQuery !== '') {
        if (this.props.results.length > 0) {
          content = this.props.results.map(post => <SearchResultCell key={post.id} result={post} showConversation={this.showConversation} />);
        } else {
          content = (
            <NonIdealState
              icon="issue"
              title="No results found"
              description={`No results were found for \'${this.state.searchQuery}\'. Try using a different search term.`}
            />
          );
        }
      } else {
        content = (
          <NonIdealState
            title="Find new conversations"
            description="Search for specific topics or keywords your interested in seeing discussions about."
          />
        );
      }
    }
    return (
      <div className="search-results">
        {content}
      </div>
    );
  }

  updateSearch = (value) => {
    this.setState({searchQuery: value});
    this.props.dispatch(search(value));
    mixpanel.track('Perform Search', {query: value});
  }

  clearSearch = () => {
    this.setState({searchQuery: ''});
    this.props.dispatch(clearSearch());
    this.input.focus();
  }

  render() {
    return (
      <div className="page-wrap">
        <div className="container">
          <div className="search-box-wrap my-3">
            <div className="form-group">
              <div className="search-input-wrap">
                <input
                  ref={(input) => { this.input = input; }}
                  autoFocus={true}
                  autoComplete="off"
                  type="text" 
                  className="form-control form-control-lg" 
                  id="search-input" 
                  placeholder="Search Disagree with Me"
                  value={this.state.searchQuery}
                  onChange={(e) => this.updateSearch(e.target.value)}
                />
                <i className="fas fa-search text-muted search-icon" />
                {(this.state.searchQuery && this.state.searchQuery !== '') &&
                  <i className="fas fa-times text-muted reset-search-icon" onClick={this.clearSearch} />
                }
              </div>
            </div>
          </div>
          <div className="search-results-wrap">
            {this.renderSearchResults()}
          </div>
          {(this.state.searchQuery !== '' && this.props.results.length > 0) &&
            <div className="powered-by-wrap text-right mt-5 text-muted text-uppercase small">
              Powered by <a href="https://www.algolia.com" target="_blank">Algolia</a>
            </div>
          }
        </div>
      </div>
    );
  }
}

function select(store) {
  return {
    user: store.user,
    loading: store.search.loading,
    results: store.search.list,
  };
}

export default withRouter(connect(select)(SearchView));
