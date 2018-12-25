// 该路由只是为了触发路由跳转 让路由我的学分能够重新加载
import React,{Component} from 'react'
class Reload extends Component {
  componentWillMount(){
    this.props.history.push('/myScore')
  }
  render(){
    return (
      <div id="reload">

      </div>
    )
  }
}
export default Reload