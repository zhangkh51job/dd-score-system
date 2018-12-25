import React, {Component} from 'react'
import {InputItem} from 'antd-mobile';

class SearchInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {placeholder = ''} = this.props;
    return (
      <div id="search">
        <InputItem
          type="phone"
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default SearchInput;