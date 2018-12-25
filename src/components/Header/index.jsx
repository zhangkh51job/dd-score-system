import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './index.scss'

class HeaderBar extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired, // 商家名
  }

  handleGoBack() {
    console.log('go-back');
  }

  render() {
    let {title} = this.props;
    let {children} = this.props;
    console.log('children',children)
    return (
      <div id="header">
        <span className="go-back" onClick={this.handleGoBack}>返回</span>
        <span className="title" name="detail">{title}</span>
        {
          children
        }
      </div>

    )
  }
}

export default HeaderBar;