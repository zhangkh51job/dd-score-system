import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import './index.scss';
import {getSign, getUser, checkLogin} from '@/api/user'
import Loading from '@/components/Loading'
import {setShowLoading} from '@/store/user/action'


class Index extends Component {
  constructor() {
    super();
    this.state = {
      routerList: [
        {
          name: '学分查询',
          detail: '查询个人及组织学分',
          url: '/myscore',
          icon: require('../../assets/index-icon1.png')
        },
        /*{
          name: '个人学分',
          detail: '查询个人及组织学分',
          url: '/myscore',
          icon: require('../../assets/index-icon1.png')
        },*/
        {
          name: '学分秘籍',
          detail: '学分管理规则',
          url: '/guide',
          icon: require('../../assets/index-icon3.png'),
        },
        {
          name: '敬请期待',
          detail: '更多功能敬请期待',
          url: '#',
          icon: require('../../assets/index-icon2.png')
        },
      ]
    }
  }

  getUserInfo(result) {
    getUser({code: result.code}).then(response => {
      let data = response.data;
      localStorage.setItem('username', data.realName);
      // 如果是leader的情况
      if (data.leader) {
        localStorage.setItem('leader', 'true');
      } else {
        localStorage.removeItem('leader');
      }
      this.props.setShowLoading({showLoading: false})
    }).catch((err) => {
      console.log(err)
    })
  }

  async componentWillMount() {
    let _this = this;
    // eslint-disable-next-line
    if (false && !dd.version) {  // 不是钉钉入口跳转到error页面
      this.props.history.replace('/error');
    }

    try {

      // eslint-disable-next-line
      false && dd.ready(async function () {
        // eslint-disable-next-line
        dd.biz.navigation.setTitle({
          title: '学分管理系统',  // 控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {
          },
          onFail: function (err) {
            console.log(err);
          }
        });
        // eslint-disable-next-line
        dd.biz.navigation.setRight({
          // navigation右侧内容不要设置内容
          show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
          control: false,//是否控制点击事件，true 控制，false 不控制， 默认false
          text: '',//控制显示文本，空字符串表示显示默认文本
        });
        try {
          // 获取信息用于钉钉config配置
          let response = await getSign();
          let data = response.data;
          // eslint-disable-next-line
          dd.config({
            // 钉钉config配置
            agentId: data.agentid,
            corpId: data.corpId,//必填，企业ID
            timeStamp: data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ['runtime.info', 'biz.contact.choose',] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          try {
            // eslint-disable-next-line
            dd.runtime.permission.requestAuthCode({
              // 调用接口获取code 再用code去后端拿取用户数据
              corpId: data.corpId,
              onSuccess: (result) => {
                _this.getUserInfo(result);
              },
              onFail: function (err) {
                console.log(err);
              }
            })
            // 免密登录失败
          } catch (e) {
            console.log(e)
          }
        } catch (e) {
          // 登录过 无需再登录
          console.log('已经登录');
          _this.props.setShowLoading({showLoading: false})
        }
      }, (err) => {
        console.log(err);
      })

      /* skip dd app */
      this.getUserInfo({code:123});

    } catch (e) {
      console.log('钉钉接口出错', e);
    }
  }

  render() {
    return (
        <div id="index">
          <header className="index-header-bg">
            <img src={require("../../assets/header-bg.png")}/>
          </header>

          <div className="router-container">
            {
              this.state.routerList.map((item, index) => (
                  <Link className="router-item" to={item.url} key={index}>
                    <img className="icon-img" src={item.icon}/>
                    <div>
                      <span className="item-name">{item.name}</span>
                      <p className="item-detail">{item.detail}</p>
                    </div>
                  </Link>
              ))
            }
          </div>
          <footer className="index-footer-bg">
            <img src={require("../../assets/bottom-bg.png")}/>
          </footer>
          {
            this.props.showLoading ? <Loading/> : ''
          }
        </div>
    )
  }
}

export default connect( state => ({
  showLoading: state.proData.showLoading
}), {setShowLoading} )(Index);
