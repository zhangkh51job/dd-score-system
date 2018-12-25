import {SET_LEADER, SET_DEPARTMENTS, SET_ORG_INFO, SET_YEAR_QUARTER,SET_SHOW_LOADING} from '../action-type'

const initialState = {
  leader: false,      // 是否是leader
  departments: [],     // 所在的部门
  deptList: [], // 组织架构列表
  orgName: '请选择中心组织架构',  //当前选中的组织列表名称
  selectYear: '',   // 选择的年份
  selectQuarterIndex: '', // 选择的月份
  deptId: '',  // 当前选中的部门id
  showLoading: true  // 首次进入首页显示loading
};

export const proData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEADER:
      return {...state, leader: action.data};
    case SET_DEPARTMENTS:
      return {...state, departments: action.departments};
    case SET_ORG_INFO:
      return {...state, deptList: action.data.deptList, orgName: action.data.orgName, deptId: action.data.deptId}
    case SET_YEAR_QUARTER:
      return {...state, selectYear: action.data.selectYear, selectQuarterIndex: action.data.selectQuarterIndex}
    case SET_SHOW_LOADING:
      return {...state, showLoading:action.data.showLoading}
    default:
      return {...state}
  }
}