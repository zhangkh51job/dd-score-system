import React, {Component} from 'react'
import QuaterSelector from '@/components/QuarterSelector';
import {Picker, List} from 'antd-mobile';
import {connect} from 'react-redux'
import {getOrganizationList, getOrgScore} from '@/api/organization'
import FooterBar from '@/components/Footer'
import {setOrgInfo, setYearQuarter} from '@/store/user/action'
import './index.scss'

class OrganizationScore extends Component {
  constructor() {
    super();
    this.state = {
      district: [], // 可选择的中心组织列表
      selectYear: '',
      selectQuarterIndex: ''
    }
  }

  componentWillMount() {
    // eslint-disable-next-line
    if (false && !dd.version) {   // 不是钉钉入口跳转到error页面
      this.props.history.push('/error');
    }
    let realName = localStorage.getItem('username');
    let leader = localStorage.getItem('leader') || false;

    if (realName) {
      // 判断是否有leader权限
      if (leader) {
        // eslint-disable-next-line
        false && dd.ready(function () {
          // eslint-disable-next-line
          dd.biz.navigation.setTitle({
            title: '组织学分',//控制标题文本，空字符串表示显示默认文本
          });

          // eslint-disable-next-line
          dd.biz.navigation.setRight({
            // navigation右侧内容不要设置内容
            show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
            control: false,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '',//控制显示文本，空字符串表示显示默认文本
          });
        })

        // 获取组织列表
        getOrganizationList().then((response) => {
          if (response.data.length) {
            let list = [];
            response.data.forEach(item => {
              let obj = {
                deptId: item.deptId,
                label: item.name,
                value: item.name
              }
              list.push(obj);
              this.setState({
                district: list
              })
            })
            // 如果只有一个部门，默认选中
            if (response.data.length === 1) {
              this.handleSelect([list[0].value])
            }
          }
        })
      } else {
        this.props.history.replace('/myScore');
      }
    } else {
      this.props.history.replace('/');
    }
  }

  // 点击我的学分按钮 跳转到我的学分
  handleToMyScore() {
    this.props.history.push('/myScore');
  }

// 进入组织学分
  handleToOrganization() {
    this.props.history.push('/organizationScore');
  }

// 组织架构选中
  handleSelect(value) {
    let {district} = this.state;
    let {selectYear, selectQuarterIndex} = this.props;
    let deptId = '';
    // 在district列表中找出选中该项对应的deptId
    district.forEach(item => {
      if (item.value === value[0]) {
        deptId = item.deptId;
      }
    })
    getOrgScore({dept: deptId, year: selectYear, quarter: selectQuarterIndex}).then((response) => {
      let data = response.data;
      this.props.setOrgInfo({deptList: data, orgName: value[0], deptId})
    })
  }

// 季度或者年份改变
  handleQuarterSelect(year, quarter) {
    // 获取学分和明细
    this.props.setYearQuarter({selectYear: year, selectQuarterIndex: quarter.index})
    let {deptId} = this.props;
    if (deptId) {
      getOrgScore({dept: deptId, year, quarter: quarter.index}).then((response) => {
        let data = response.data;
        this.props.setOrgInfo({deptList: data, orgName: this.props.orgName, deptId})
      })
    }
  }

  // 点击人员进入详情
  infoDetail(userId, userName) {
    let {selectYear, selectQuarterIndex} = this.props;
    let {deptId} = this.props
    this.props.history.push(`/myScore?userId=${userId}&deptId=${deptId}&queryName=${userName}&queryYear=${selectYear}&queryQuarterIndex=${selectQuarterIndex}`);
  }

  render() {
    let {orgName, deptList, selectYear, selectQuarterIndex} = this.props;
    return (
      <div id="OrganizationScore">
        <QuaterSelector
          queryYear={selectYear}
          queryQuarterIndex={selectQuarterIndex}
          handleQuarterSelect={this.handleQuarterSelect.bind(this)}
        />

        <List style={{backgroundColor: 'white'}} className="picker-list select-container">
          <Picker extra={orgName}
                  data={this.state.district}
                  title="请选择中心组织架构"
                  onOk={this.handleSelect.bind(this)}
                  onDismiss={e => console.log('dismiss', e)}
                  cols={1}
          >
            <List.Item arrow="horizontal"/>
          </Picker>
        </List>
        {
          orgName === '请选择中心组织架构' ?
            <img className="img-tip" src={require("../../assets/orgazation-tip_03.png")}/> : ''
        }
        <article className="list-container">
          {
            deptList.map((item, index) => (
              <section key={index} onClick={this.infoDetail.bind(this, item.userId, item.userName)}>
                {
                  // 因为如果是钉钉默认头像 钉钉返回的字段是空的 所以手动绘制一个头像
                  <span className="avatar-create">{item.userName.length === 2 ? item.userName : item.userName.slice(1, 3)}</span>
                }
                <div className="info-container">
                  <span className="name">{item.userName}</span>
                  <span className="job">{item.position}</span>
                </div>
                <span className="score">{item.total}分</span>
              </section>
            ))
          }
        </article>

        <FooterBar
          isOrgPage="true"
          handleToOrganization={this.handleToOrganization.bind(this)}
          handleToMyScore={this.handleToMyScore.bind(this)}
        />
      </div>
    )
  }
}

export default connect(state => {
  return ({
    deptId: state.proData.deptId,
    deptList: state.proData.deptList,
    orgName: state.proData.orgName,
    selectYear: state.proData.selectYear,   // 选择的年份
    selectQuarterIndex: state.proData.selectQuarterIndex, // 选择的月份
  })
}, {setOrgInfo, setYearQuarter})(OrganizationScore);

