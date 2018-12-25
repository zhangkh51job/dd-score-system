import React, {Component} from 'react'
import "./index.scss"

class FooterBar extends Component {

  render() {
    let {handleToOrganization, handleToMyScore, isOrgPage} = this.props;
    return (
      <div id="footer">
        <span className={`btn-my-score ${isOrgPage ? '' : 'active'}`} onClick={handleToMyScore}>我的学分</span>
        <span className={`btn-my-score ${isOrgPage ? 'active' : ''}`} onClick={handleToOrganization}>组织学分</span>
      </div>
    )
  }
}

export default FooterBar;