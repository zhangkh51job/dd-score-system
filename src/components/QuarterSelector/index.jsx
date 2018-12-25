import React, {Component} from 'react'
import './index.scss';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class QuartSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quarterList: [
        {
          quarter: '全年',
          month: '1月-12月',
          index: 0
        },
        {
          quarter: '一季度',
          month: '1月-3月',
          index: 1
        },
        {
          quarter: '二季度',
          month: '4月-6月',
          index: 2
        },
        {
          quarter: '三季度',
          month: '7月-9月',
          index: 3
        },
        {
          quarter: '四季度',
          month: '10月-12月',
          index: 4
        }
      ],
      quarterSelectedIndex: 0,
      selectYearVisible: false,
      nowYear: new Date().getFullYear(),
      lastYear: new Date().getFullYear() - 1,
      selectQueryYear: new Date().getFullYear(),  // 默认查询年份是当前年
    }
  }

  componentWillMount() {
    // 获取当前月份
    let index = Math.ceil((new Date().getMonth() + 1) / 3);

    let {queryQuarterIndex, queryYear} = this.props

    if (queryQuarterIndex && queryYear) {
      this.setQuarter(Number(queryQuarterIndex), queryYear)
    } else {
      this.setQuarter(index, this.state.selectQueryYear)
    }
  }

  // 季度选择
  handleQuarterSelect(index) {
    let {selectQueryYear} = this.state;
    this.setQuarter(index, selectQueryYear);
  }

  // 调用父组件方法更新数据
  setQuarter(quarterSelectedIndex, selectQueryYear) {
    let {handleQuarterSelect} = this.props;
    let {quarterList} = this.state;
    handleQuarterSelect(selectQueryYear, quarterList[quarterSelectedIndex])
    this.setState({
      quarterSelectedIndex,
      selectQueryYear
    })
  }

  // 年份选择show
  handleYearSelectShow() {
    this.setState({
      selectYearVisible: true,
    })
  }

  //年份选择
  handleYearSelect(e) {
    let {selectQueryYear, quarterSelectedIndex, nowYear, lastYear} = this.state;
    let value = selectQueryYear === nowYear ? lastYear : nowYear;
    this.setState({
      selectQueryYear: value,
      selectYearVisible: false
    });
    this.setQuarter(quarterSelectedIndex, value);
    e.stopPropagation();
  }

  // 点击遮罩 关闭遮罩
  handleMaskClick() {
    this.setState({
      selectYearVisible: false
    })
  }

  // 遮罩出现时 禁止屏幕滑动
  handleTouchMove(e) {
    if (this.state.selectYearVisible) {
      e.preventDefault()
    }
  }

  render() {
    let {quarterList, selectYearVisible, selectQueryYear, nowYear, lastYear, quarterSelectedIndex} = this.state;
    return (
      <div id="quartSelector" onTouchMove={this.handleTouchMove.bind(this)}>
        <nav>
          <div className="year-selector" onClick={this.handleYearSelectShow.bind(this)}>
            <span className="year-txt">{selectQueryYear}</span>
            <i className="icon-arrow"/>
            <i className="icon-border"/>
            {
              selectYearVisible ?
                <div className="other-year" onClick={this.handleYearSelect.bind(this)}>
                  <span className="other-year-txt">{selectQueryYear === nowYear ? lastYear : nowYear}</span>
                </div> : ''
            }
          </div>
          <div className="quarter-selected-container">
            <div className="scroll-container">
              {
                quarterList.map((item, index) => (
                  <span
                    onClick={this.handleQuarterSelect.bind(this, index)}
                    className={`nav-item  ${quarterSelectedIndex === index ? 'active' : ''}`}
                    key={index}>{item.quarter}</span>
                ))
              }
            </div>
          </div>
        </nav>
        {/*tabs-wrap类的样式写在syle/mixin.scss中*/}
        <CSSTransitionGroup
          transitionName="tabs-wrap"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {
            selectYearVisible ?
              <div className="mask tab-item-active"
                   onClick={this.handleMaskClick.bind(this)}

              /> : ''
          }
        </CSSTransitionGroup>

      </div>
    )
  }
}

export default QuartSelector;

