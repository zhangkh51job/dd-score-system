import {_get} from './index'

// 获取我的学分
export const getScore = (data) => {
  let req = {
    url: `/api/ding/score/statics/${data.year}/${data.quarter}/0`
    //url: `/ding/score/statics/${data.year}/${data.quarter}/${data.userId}`
  }
  req.data = {};
  return _get(req);
}

// 筛选
export const filterScore = (data) => {
  let req = {
    url: `/api/ding/score/detail/${data.deptId}/${data.userId}`
    //url: `/ding/score/detail/${data.deptId}/${data.userId}`
  };
  req.data = {
    begDate: data.begDate,
    endDate: data.endDate,
    studyType: data.studyType
  };
  if (data.studyType) {
    req.data.studyType = data.studyType.join(',')
  }
  return _get(req);
}

// 获取学分类型表
export const studyType = (data) => {
  let req = {
    url: '/api/ding/settings'
    //url: '/ding/settings'
  }
  req.data = {};
  return _get(req);
}

export const setCookie = (data) => {
  let req = {
    url: '/api/score/validation/danche'
    //url: '/ding/settings'
  }
  req.data = {};
  return _get(req);
}

