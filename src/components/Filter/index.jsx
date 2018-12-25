import React, {Component} from 'react'
import {Button} from 'antd-mobile';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      projectType: [
        {
          type: '培训必修课',
          value: 1
        },
        {
          type: '培训选修课',
          value: 2
        },
        {
          type: '自主学习',
          value: 3
        },
        {
          type: '技能竞赛',
          value: 4
        },
        {
          type: '学习分享',
          value: 5
        },
        {
          type: '知识库建设',
          value: 6
        }
      ]
    }
  }

  onChange() {
    console.log('change')
  }

  render() {
    let {projectType} = this.state;
    return (
      <div id="filter">
        <h4>项目类型</h4>
        {
          projectType.map((item, index) => (
            <span>{item.type}</span>
          ))
        }
        <h4>日期</h4>
        <div>

        </div>

        <footer>
          <Button type="primary">筛选</Button>
          <Button type="primary">取消</Button>
        </footer>
      </div>
    )
  }
}

export default Filter;