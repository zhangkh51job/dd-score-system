import React, {Component} from 'react'
import {Accordion, List} from 'antd-mobile';
import './index.scss';

class Guide extends Component {

  constructor() {
    super();
    this.state = {
      guideData: [
        {
          title: '1、什么是学分制？',
          content: '学分制作为团贷网的一种学习管理制度，是推动公司向学习型组织转型的制度保障。其基本特点是：以学分作为员工学习的计量单位，以取得必要的最低学分（90分）作为年度考核的标准。'
        },
        {
          title: '2、如何获取学分？',
          content: '根据团贷网《学分制实施方案》，员工参加各种线下学习活动均可获得相应学分，线下学习活动包括：参加培训、自主学习、技能竞赛、学习分享、知识库建设。'
        },
        {
          title: '3、学分考核标准是如何？',
          content:
            `<p class="content-item">1、学分考核周期为当年1月1日—12月31日；</p>
            <p class="content-item">2、年度学分满分为150分，年度学分考核标准值为90分，其中每季度所修最低学分不得低于20分；</p>
            <p class="content-item">3、年度内部培训必修课完成学分占标准学分比例不得低于50%，内部培训选修课学分完成占标准学分比例不得高于30%；</p>
            <p class="content-item">4、对于当年入职的新员工，按实际在职天数折算年度学分考核标准值。</p> `
        },
        {
          title: '4、学分结果如何应用？',
          content: '学分结果应用包括“奖”和“惩”两部分，“奖”包括学分兑换礼物、现金奖励、加薪券、优先评优、优先晋升晋级等；“罚”包括通报提醒、绩效限评、以讲代学等。'
        },
        {
          title: '5、学分如何到导入系统？',
          content: '中心、部门、个人学习活动需进行学分登记，可联系所属中心政委申请登记；集团、公司层面学习活动需进行学分登记，由培训管理部统一进行登记导入。'
        }
      ]
    }
  }

  componentWillMount() {
    // eslint-disable-next-line
    if (false && !dd.version) {
      this.props.history.replace('/error');
    }
  }
  onChange = (key) => {
    console.log(key);
  }

  render() {
    let {guideData} = this.state;
    return (
      <div id="guide">
        <h4 className="title">秘籍目录</h4>

        {/*       <article className="score-guide-container">
          <section className="score-guide-title">
            <span className="score-guide-left">学分途径</span>
            <span className="score-guide-middle">计分项目</span>
            <span className="score-guide-right">学分计算</span>
          </section>
          参加培训
          <section className="score-attend-train">
            <div className="score-guide-left">
              <span>参加培训</span>
            </div>
            <div className="score-guide-middle train-project-container">
              <div className="train-project-top">
                <div className="train-item-name"><span className="item-text-top">内部</span><span
                  className="item-text-bottom">培训</span></div>
                <div className="train-course-type">
                  <span>必修课</span>
                  <span>选修课</span>
                </div>
              </div>
              <span>外部培训</span>
              <span>无故缺勤</span>
            </div>

            <div className="train-calc-container score-guide-right">
              <span>1课时=2学分</span>
              <span>1课时=1学分</span>
              <span>半天=3学分</span>
              <span>-5学分/次</span>
            </div>
          </section>
          自主学习
          <section className="score-learn-container">
            <div className="score-guide-left">
              <span>自主学习</span>
            </div>
            <div className="score-guide-middle">
              <span className="score-learn-project">学历教育（本/硕/MBA/EMBA)</span>
              <span className="score-learn-project">职业技能培训（金融类/专业类）</span>
            </div>
            <div className="train-calc-container score-guide-right score-learn-item">
              <span className="item-learn-score">20学分/年</span>
              <span className="item-learn-score">10学分/证</span>
            </div>
          </section>
          <section>
            <div className="score-guide-left">
              <span>技能竞赛</span>
            </div>
            <div className="score-guide-middle">
              <span>技能比武</span>
              <span>创新大赛</span>
              <span>内部各类主题大赛活动</span>
            </div>
            <div className="train-calc-container score-guide-right">
              <span>5~10学分</span>
              <span>5~10学分</span>
              <span>5~10学分</span>
            </div>
          </section>
          <section>
            <div className="score-guide-left">
              <span>学习分享</span>
            </div>
            <div className="score-guide-middle">
              <span>读书分享会</span>
              <span>发表文章</span>
              <span>授课</span>
              <span>担任导师</span>
            </div>
            <div className="train-calc-container score-guide-right">
              <span>3~5学分</span>
              <span>5学分/篇</span>
              <span>5~8学分</span>
              <span>10学分</span>
            </div>
          </section>
          <section>
            <div className="score-guide-left">
              <span>知识库建设</span>
            </div>
            <div className="score-guide-middle">
              <span>课程开发</span>
              <span>案例萃取</span>
            </div>
            <div className="train-calc-container score-guide-right">
              <span>5~10学分/门</span>
              <span>5学分/例</span>
            </div>
          </section>
        </article>
*/}

        <div className="list-container">
          <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
            {
              guideData.map((item, index) => (
                <Accordion.Panel className="list-title" header={item.title} key={index}>
                  <List className="my-list">
                    <List.Item
                    >
                      <div dangerouslySetInnerHTML={{
                        __html: item.content
                      }}>
                      </div>
                      {
                        index === 1 ? <div>
                          <img className="guide-pic-table" src={require("../../assets/table.png")}/>
                        </div> : ''
                      }
                    </List.Item>
                  </List>
                </Accordion.Panel>
              ))
            }
          </Accordion>
        </div>
      </div>
    )
  }
}

export default Guide;