import React, {Component} from 'react'
import "./index.scss"
import {DatePicker, List} from 'antd-mobile';
import {studyType, filterScore} from '@/api/score'
import CSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment'
import qs from 'qs'

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      detailList: [],     // 详情列表
      searchList: [],    // 搜索功能用的一个临时数组
      isSearch: false,  // 是否搜索过
      selectType: [],   // 可选项目类型
      selectStartTime: '请选择',// 筛选框中开始时间的值
      selectEndTime: '请选择',// 筛选框中结束时间的值
      startValue: new Date(), // 用于DatePicker的startTime value值
      endValue: new Date(),   // 用于DatePicker的EndTime value值
      startDatePickerShow: false,// startDatePicker显示
      endDatePickerShow: false,  // endDatePicker显示
      sortSelectType: [],       // 可选类型格式化的的数据
      studyType: [],           // 筛选时选中的项目类型
      filterVisible: false,  // 筛选框
      tipShow: false,        // 提示框
      begDate: '',           // 筛选时选择的开始时间
      endDate: '',          // 筛选时选择的结束时间
      nothingItem: false, // 没有学分记录
      nothingResult: false // 没有筛选结果
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    if (false && !dd.version) {
      this.props.history.replace('/error');
    }
    // eslint-disable-next-line
    false && dd.ready(function () {
      // eslint-disable-next-line
      dd.biz.navigation.setTitle({
        title: '学分明细',//控制标题文本，空字符串表示显示默认文本
      });

      // eslint-disable-next-line
      dd.biz.navigation.setRight({
        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        text: '筛选',//控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          _this.setState({
            filterVisible: !_this.state.filterVisible
          })
        },
      });
    })

    let _this = this;

    /* skip dd app */
    _this.setState({
      filterVisible: !_this.state.filterVisible
    })
    /*
     *  从我的学分页面跳转过来  根据上一个页面选择的年份和季度获取详情数据
     *  年份和季度保存在url中
     *  通过qs解析
     */
    let parsed = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    let begDate = parsed.begDate;
    let endDate = parsed.endDate;
    let deptId = parsed.deptId; // 查询用户所在的部门id
    let userId = parsed.userId; // 查询的用户id
    let selectYear = parsed.selectYear;
    let selectQuarterIndex = parsed.selectQuarterIndex;
    let queryStudyType = parsed.studyType;

    /*deptId = 123;
    userId = 0;*/

    this.setState({
      deptId,
      userId,
      selectYear,
      selectQuarterIndex
    })

    // 获取学分列表
    filterScore({
      begDate,
      endDate,
      deptId,
      userId,
      studyType: queryStudyType ? [queryStudyType] : ''
    }).then((response) => {
      studyType().then((typeResponse) => {
        let resStudyType = typeResponse.data.studyType;
        let detailList = response.data;
        detailList.forEach((item) => {
          for (let i = 0; i < resStudyType.length; i++) {
            if (parseInt(item.studyType) === parseInt(resStudyType[i].key)) {
              item.desc = resStudyType[i].desc;
            }
          }
        })

        let sortSelectType = [];
        // 格式化 每3个分为一组
        for (let i = 0; i < resStudyType.length / 3; i++) {
          let arr = resStudyType.slice(i * 3, (i + 1) * 3);
          sortSelectType.push(arr);
        }
        this.setState({
          selectType: resStudyType,
          sortSelectType
        })

        if (detailList.length) {
          this.setState({
            detailList: detailList
          })
        } else {
          this.setState({
            nothingItem: true,
            detailList: []
          })
        }
      })
    })


  }

  // 点击筛选
  handleFilterClick() {
    let {begDate, endDate, studyType, deptId, userId} = this.state;
    if (!begDate || !endDate || !studyType.length) {
      // 没有选择就tip提示
      this.setState({
        tipShow: true
      })

      setTimeout(() => {
        this.setState({
          tipShow: false
        })
      }, 1000)
    } else {
      filterScore({begDate, endDate, studyType, deptId, userId}).then((response) => {
        // 获取项目类型
        let detailList = response.data;
        if (detailList.length) {
          detailList.forEach((item) => {
            for (let i = 0; i < studyType.length; i++) {
              if (parseInt(item.studyType) === parseInt(studyType[i].key)) {
                item.desc = studyType[i].desc;
              }
            }
          })
          console.log('detailList', detailList)
          this.setState({
            detailList,
            nothingResult: false
          })
        } else {
          this.setState({
            detailList: [],
            nothingResult: true,
          })
        }
        this.setState({
          filterVisible: false,
          nothingItem: false
        })
      })
    }
  }

  // 取消 关闭筛选框
  handleCancel() {
    this.setState({
      filterVisible: false
    })
  }

  // 屏幕滚动
  handelTouchMove(e) {
    // 筛选框出现时 禁止屏幕滚动
    if (this.state.filterVisible) {
      e.preventDefault();
    }
  }

  // 选中studyItem
  selectType(key) {
    let {studyType} = this.state;
    let isExit = studyType.indexOf(key);
    if (isExit !== -1) {
      studyType.splice(isExit, 1);
    } else {
      studyType.push(key);
    }
    this.setState({
      studyType
    })
  }

  // 选中开始时间
  handleStartTime(date) {
    // 格式化为后端要求格式
    let time = moment(date).format('YYYY-MM-DD');
    let begDate = time + ' 00:00:00';
    this.setState({
      begDate,
      selectStartTime: time,
      startDatePickerShow: false
    })
  }

  // 选中结束时间
  handleEndTime(date) {
    // 格式化为后端要求格式
    let time = moment(date).format('YYYY-MM-DD');
    let endDate = time + ' 23:59:59';
    this.setState({
      endDate,
      endDatePickerShow: false,
      selectEndTime: time
    })
  }

  // 展开详情
  showDetail(index) {
    let {detailList} = this.state;
    detailList[index].collapse = !detailList[index].collapse
    this.setState({
      detailList
    })
  }

  // 回车搜索
  keypress(e) {
    if (e.which !== 13) return;
    e.preventDefault();
    let value = e.target.value;
    if (!value) {
      return;
    }
    this.searchTrigger(value)
    return false;
  }

  // 点击搜索图标搜索
  searchCourse() {
    this.searchTrigger(this.refs['searchInput'].value)
  }

  searchTrigger(value) {
    let searchResult = [];
    if (!value) {
      return;
    } else {
      this.state.detailList.forEach((item) => {
        if (item.studyContent.indexOf(value) !== -1) {
          searchResult.push(item);
        }
      })
      if (searchResult.length) {
        this.setState({
          tempList: searchResult,
          isSearch: true,
          nothingResult: false
        })
      } else {
        this.setState({
          tempList: [],
          isSearch: true,
          nothingResult: true // 没有筛选结果
        })
      }
    }
    return false;
  }


  render() {
    let {sortSelectType, filterVisible, tipShow, studyType, nothingItem, nothingResult, isSearch} = this.state;
    // 判断显示搜索的列表还是全部列表
    let detailList = isSearch ? this.state.tempList : this.state.detailList;
    return (
      <div id="score-detail" onTouchMove={this.handelTouchMove.bind(this)}>
        <form action="" className="input-container">
          <i className="icon-search" onClick={this.searchCourse.bind(this)}/>
          <input type="search" className="input" placeholder="搜索：培训课程名称" ref="searchInput"
                 onKeyPress={this.keypress.bind(this)}/>
        </form>
        {/*
        <form action="" className="input-container-v2">
          <i className="icon-search" onClick={this.searchCourse.bind(this)}/>
          <input type="search" className="input" placeholder="搜索：培训课程名称" ref="searchInput"
                 onKeyPress={this.keypress.bind(this)}/>
        </form>*/}

        <article className="detail-container">
          {
            detailList.map((item, index) => (
              <section className="detail-item" key={index}>
                <div>
                  <div className="panel-header" onClick={this.showDetail.bind(this, index)}>
                    <div className="item-top">
                      <span className="name">{item.studyContent}</span>
                      <span className={`score ${item.score > 0 ? "add-score" : "reduce-score"} `}>{item.score}分
                        <i className={`icon-arrow ${item.collapse ? "icon-arrow-up" : "icon-arrow-dowm"}`}/>
                      </span>
                    </div>
                    <div className="item-bottom">
                      <span className="time">{item.startDate}</span>
                      <span className="course">{item.desc}</span>
                    </div>
                  </div>
                  {
                    item.collapse ?
                      <ul className="collapse-container">
                        <li>
                          <span>是否出勤</span>
                          <span>{item.attendance === 0 ? '是' : item.attendance === 1 ? '否' : '无需考勤'}</span>
                        </li>
                        <li>
                          <span>培训时长</span>
                          <span>{parseInt(item.duration)}小时</span>
                        </li>
                        <li>
                          <span>考核成绩</span>
                          <span>{item.examResults}</span>
                        </li>
                      </ul> : ''
                  }
                </div>
              </section>
            ))
          }
        </article>

        {/*筛选*/}
        <CSSTransitionGroup
          transitionName="filter-wrap"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {filterVisible ?
            <div className="filter-container">
              <h3 className="project-type">项目类型</h3>
              <div className="type-container">
                {
                  sortSelectType.map((item, index) => (
                    <ul className="type-item-container" key={index}>
                      {
                        item.map((typeItem, typeIndex) => (
                          <li key={typeIndex}
                              className={`type-item ${studyType.indexOf(typeItem.key) !== -1 ? 'type-item-active' : ''}`}
                              onClick={this.selectType.bind(this, typeItem.key)}>{typeItem.desc}</li>
                        ))
                      }
                    </ul>
                  ))
                }
              </div>

              <h3 className="select-time-title">日期</h3>

              <div className="date-picker-container">
                <List className="date-picker-list date-picker-list-start" style={{backgroundColor: 'white'}}>
                  <List.Item
                    extra={this.state.selectStartTime}
                    onClick={() => this.setState({startDatePickerShow: true})}
                  >
                  </List.Item>

                  <DatePicker
                    mode="date"
                    visible={this.state.startDatePickerShow}
                    value={this.state.startValue}

                    onOk={this.handleStartTime.bind(this)}
                    onDismiss={() => this.setState({startDatePickerShow: false})}
                  />
                </List>

                <span className="line"/>

                <List className="date-picker-list date-picker-list-end" style={{backgroundColor: 'white'}}>
                  <List.Item
                    extra={this.state.selectEndTime}
                    onClick={() => this.setState({endDatePickerShow: true})}
                  >
                  </List.Item>

                  <DatePicker
                    mode="date"
                    visible={this.state.endDatePickerShow}
                    minDate={new Date(this.state.selectStartTime)}
                    value={this.state.EndValue}
                    onOk={this.handleEndTime.bind(this)}
                    onDismiss={() => this.setState({endDatePickerShow: false})}
                  />
                </List>
              </div>

              <div className="btn-container">
                <span className="btn-filter" onClick={this.handleFilterClick.bind(this)}>筛选</span>
                <span className="btn-cancel" onClick={this.handleCancel.bind(this)}>取消</span>
              </div>

              <CSSTransitionGroup
                transitionName="tabs-wrap"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {
                  tipShow ?
                    <span className="tip">请选择条件后筛选</span> : ''
                }
              </CSSTransitionGroup>

            </div> : ''}

        </CSSTransitionGroup>
        {filterVisible ? <div className="mask"/> : ''}

        {/*没有结果*/}
        {
          nothingItem ?
            <div className="nothing-score-item">
              <img src={require("../../assets/nothing-score-item.png")}/>
            </div> : ''
        }

        {/*没有筛选结果*/}
        {
          nothingResult ?
            <div className="nothing-score-item">
              <img src={require("../../assets/no-search-result.png")}/>
            </div> : ''
        }
      </div>
    )
  }
}

export default Detail;