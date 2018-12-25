import React, {Component} from 'react'
import './index.scss'

class Loading extends Component {
  render() {
    return (
      <div id="loading">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
            <div className="object"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading;