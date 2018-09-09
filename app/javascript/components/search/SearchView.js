import React from 'react';
import SearchResultCell from './SearchResultCell';
import {AppToaster} from '../common/AppToaster';
import LoadingView from '../common/LoadingView';
import {
  NonIdealState,
} from '@blueprintjs/core';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  algoliaAppId,
  algoliaSearchKey,
  algoliaEnv,
} from '../../env';

class SearchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchQuery: '',
      searchResults: [],
    };

    this.search_client = algoliasearch(algoliaAppId, algoliaSearchKey);
    this.search_helper = algoliasearchHelper(this.search_client, `Post_${algoliaEnv}`);
  }

  componentDidMount() {
    this.search_helper.on('result', this.returnResults);
    this.search_helper.on('search', this.handleLoadingResults);
    this.search_helper.on('error', this.handleError);
  }

  handleLoadingResults = () => {
    this.setState({loading: true});
  }

  handleError = (error) => {
    this.setState({loading: false});
    AppToaster.show({ message: error, intent: "danger", icon: "error" });
  }

  returnResults = (content) => {
    this.setState({searchResults: content.hits, loading: false});
  }

  showConversation = (postId) => {
    this.props.history.push(`/conversations/${postId}`);
  }

  renderSearchResults = () => {
    let content;
    if (this.state.loading) {
      content = <LoadingView />;
    } else {
      if (this.state.searchQuery !== '') {
        if (this.state.searchResults.length > 0) {
          content = this.state.searchResults.map(hit => <SearchResultCell key={hit.objectID} result={hit} showConversation={this.showConversation} />);
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
            description="Search for specific topics or key words your interested in seeing discussions about."
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
    this.search_helper.setQuery(value).search();
  }

  clearSearch = () => {
    this.setState({searchQuery: '', searchResults: []});
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
          {(this.state.searchQuery !== '' && this.state.searchResults.length > 0) &&
            <div className="powered-by-wrap text-right mt-5 text-muted text-uppercase small">
              Powered by <a href="https://www.algolia.com" target="_blank">Algolia</a>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(SearchView));
