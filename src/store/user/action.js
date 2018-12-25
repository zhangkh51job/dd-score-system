import {SET_LEADER, SET_DEPARTMENTS, SET_ORG_INFO, SET_YEAR_QUARTER, SET_SHOW_LOADING} from '../action-type'

export function setLeader(boolean) {
  return {type: SET_LEADER, data: boolean}
}

export function setDepartments(data) {
  return {type: SET_DEPARTMENTS, data}
}

export function setOrgInfo(data) {
  return {type: SET_ORG_INFO, data}
}

export function setYearQuarter(data) {
  return {type: SET_YEAR_QUARTER, data}
}

export function setShowLoading(data) {
  return {type: SET_SHOW_LOADING, data}
}