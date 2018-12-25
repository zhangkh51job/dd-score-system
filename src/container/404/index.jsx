import React, {Component} from 'react'
import "./index.scss"

export default class Error extends Component {
  render() {
    return (
      <div id="error">
        <div className="container">
          <img className="ding-logo" src={require("../../assets/dingding-logo.jpg")}/>
          <h4 className="tip">应用为钉钉应用，请在钉钉软件上打开</h4>
        </div>
      </div>
    )
  }
}