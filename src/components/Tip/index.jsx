import React, {Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'

class Tip extends Component {
  render() {
    let {leader} = this.props;
    return (
      <div className={`tip-container ${leader ? 'is-leader' : ''}`}>
        <i className="tip-icon"/>
        <span className="tip-txt">系统仅能查看近两年的学分情况</span>
      </div>
    )
  }
}

export default connect(state => ({
  leader: state.proData.leader
}))(Tip);
