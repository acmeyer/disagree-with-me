import React from 'react';
import _ from 'lodash';

class AppReadMore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truncate: true,
    };
  }

  toggle = (e) => {
    e.stopPropagation();
    this.setState({truncate: !this.state.truncate});
  }

  render() {
    if (this.props.text.length < this.props.length) {
      return this.props.text;
    }

    const text = this.state.truncate ? _.truncate(this.props.text, {'length': this.props.length || 100}) : this.props.text;
    const link_text = this.state.truncate ? 'more' : 'less';

    return (
      <div>
        {text} <a className="small read-more-link" onClick={this.toggle}>({link_text})</a>
      </div>
    )
  }

}

export default AppReadMore;