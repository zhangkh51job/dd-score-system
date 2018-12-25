import {_get} from './index'

export const getSign = () => {
  let req = {
    url:'/api/ding/sign'
  }
  req.data = {};
  return _get(req);
}

export const getUser = (data) => {
  let req = {
    //url:`/api/ding/user/${data.code}`
    url:`/ding/user/${data.code}`
  }
  req.data = {};
  return _get(req);
}