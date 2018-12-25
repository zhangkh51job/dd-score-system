import {_get} from './index'

// 获取组织列表
export const getOrganizationList = (data) => {
  let req = {
    //url: `/api/ding/score/org/list`
    url: `/ding/score/org/list`
  }
  req.data = {};
  return _get(req);
}

// 选择组织获取人员信息
export const getOrgScore = (data) => {
  let req = {
    //url: `/api/ding/score/org/${data.year}/${data.quarter}/${data.dept}`
    url: `/ding/score/org/${data.year}/${data.quarter}/${data.dept}`
  }
  req.data = {};
  return _get(req);
}