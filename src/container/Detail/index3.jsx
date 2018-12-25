import React, {Component} from 'react'

import QuartSelector from '@/components/QuarterSelector'
import FooterBar from '@/components/Footer'
import Tip from '@/components/Tip'
import CountUp from '@/components/CountUp'
import {connect} from 'react-redux'
import {getScore} from '@/api/score';
import {dateFormat} from "@/utils/dateFormat";
import qs from 'qs'
import './index.scss'

class MyScore extends Component {
  constructor() {
    super();
    this.state = {
      scoreDetail: [],  //分数详情,
      selectYear: '',   // 当前选择的年份
      selectMonth: '', // 当前选择的月份
      selectQuarterIndex: 0, // 选择的季度下标
      realName: '',           // 用户名
      score: 0,             //  分数
      userId: 0,
      deptId: 0,
      queryName: '',     // 被查询者的姓名
      queryYear: '',      // 查询时的年份 从组织学分的query带过来
      queryQuarterIndex: 0, // 查询时的季度 从组织学分的query带过
      leader: false
    }
  }

  componentWillMount() {
    // eslint-disable-next-line
    if (!dd.version) {    // 不是钉钉入口跳转到error页面
      this.props.history.push('/error');
    }
    let _this = this;

    let realName = localStorage.getItem('username');
    let leader = localStorage.getItem('leader') || false;

    this.setState({
      leader
    })

    if (realName) {
      // eslint-disable-next-line
      false && dd.ready(function () {
        // eslint-disable-next-line
        dd.biz.navigation.setTitle({
          title: '我的学分',//控制标题文本，空字符串表示显示默认文本
        });

        // eslint-disable-next-line
        dd.biz.navigation.setRight({
          show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
          control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
          text: '明细',//控制显示文本，空字符串表示显示默认文本
          onSuccess: function (result) {
            _this.toScoreDetail();
          },
        });
      })
      /* skip dd app */
      _this.toScoreDetail();

      this.getUserInfo(realName);
    } else {
      this.props.history.replace('/');
    }
  }

  getUserInfo(realName) {
    /*
     *  我的学分这个路由 可能是组织者查看下属分数 所以根据query是否有userId来判断情况
     *
     * */
    let parsed = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    let userId = parsed.userId; // 查询的用户id
    let deptId = parsed.deptId; // 查询用户所在的部门id
    let {queryName, queryQuarterIndex, queryYear} = parsed; // 查询用户的名字、年份、季度

    // 组织者查看的情况
    if (userId) {
      this.setState({
        userId,
        deptId,
        queryName,
        queryQuarterIndex,
        queryYear
      })
    } else {
      this.setState({
        realName
      })
    }
  }


  // 季度或者年份改变
  handleQuarterSelect(year, quarter) {
    // 获取学分和明细
    getScore({year, quarter: quarter.index, deptId: this.state.deptId, userId: this.state.userId}).then((response) => {
      this.setState({
        score: response.data.total,
        scoreDetail: [...response.data.scoreItem],
        selectYear: year,
        selectQuarterIndex: quarter.index // 当前选择的月份
      })
    }, (error) => {
      if (error.response && error.response.status === 604) {
        localStorage.removeItem('username');
        // 测试 记得删除
        this.props.history.push('/');
      }
    })


    this.setState({
      selectMonth: quarter.month
    })
  }

  toScoreDetail(studyType = '') {
    let {selectYear, selectQuarterIndex, deptId, userId} = this.state;
    // 把年份和时间转为具体的时间
    let {begDate, endDate} = dateFormat(selectYear, selectQuarterIndex);
    this.props.history.push(`/detail?deptId=${deptId||62688324}&userId=${userId||'TD-7123'}&begDate=${'2018-01-01 8:00:00'}&endDate=${'2018-12-01 8:00:00'}&studyType=${studyType}`);
  }

  // 进入组织学分
  handleToOrganization() {
    this.props.history.push('/organizationScore');
  }

  // 进入我的学分
  handleToMyScore() {
    this.props.history.push('/reload');
  }

  render() {
    let {
      scoreDetail,
      selectMonth,
      realName,
      score,
      queryName,
      queryYear,
      queryQuarterIndex,
    } = this.state;
    let leader = this.state.leader;
    return (
      <div id="my-score">
        <QuartSelector
          queryYear={queryYear}
          queryQuarterIndex={queryQuarterIndex}
          handleQuarterSelect={this.handleQuarterSelect.bind(this)}
        />
        <div className="score-container">
          <h4 className="username">{queryName ? queryName : "您好，" + realName}</h4>
          <h4 className="quarter">{selectMonth}获取学分</h4>
          <div className="score" onClick={this.toScoreDetail.bind(this, '')}>
            <CountUp duration={2000} count={score} value={20}/>
            <strong>

            </strong>
            <span className="score-txt">分</span>
          </div>
        </div>

        <div className="score-detail-container">
          <h4 className="detail-title"><i className="detail-icon-title"/>项目学分统计</h4>
          <ul className="score-detail">
            {
              scoreDetail.map((item, index) => (
                <li className="score-detail-item" key={index} onClick={this.toScoreDetail.bind(this, item.studyType)}>
                  <span className="item-name">{item.studyTypeName}</span>
                  <span className="item-score">{item.score}分</span>
                </li>
              ))
            }
          </ul>
        </div>
        <Tip/>
        {
          leader ?
            <FooterBar
              handleToOrganization={this.handleToOrganization.bind(this)}
              handleToMyScore={this.handleToMyScore.bind(this)}
            /> : ''
        }
      </div>
    )
  }
}

export default connect(state => ({
  leader: state.proData.leader
}))(MyScore);
