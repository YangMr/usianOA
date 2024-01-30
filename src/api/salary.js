import service from '@/utils/request'

export function getSalarysList(data) {
  return service({
    url: '/salarys/list',
    data,
    method: 'post'
  })
}
/**
 * 获取员工列表
 * **/

export function getEmployeeList(params) {
  return service({
    url: '/sys/user',
    params // 地址参数 查询参数
  })
}
export function getTips(yearMonth) {
  return service({
    url: `/salarys/tips/${yearMonth}`
  })
}
export function getSettings() {
  return service({
    url: '/salarys/settings'
  })
}

export function getCompanySetting() {
  return service({
    url: '/salarys/company-settings'
  })
}
export function saveSettings(data) {
  return service({
    url: '/salarys/settings',
    method: 'post',
    data
  })
}

export function getSalaryDetail(userId) {
  return service({
    url: `/salarys/modify/${userId}`
  })
}
export function changeSalary(data) {
  return service({
    url: `/salarys/modify/${data.userId}`,
    method: 'post',
    data
  })
}
export function initSalary(data) {
  return service({
    url: `/salarys/init/${data.userId}`,
    method: 'post',
    data
  })
}
export function getArchivingList(params) {
  return service({
    url: `/salarys/reports/${params.year}`,
    params
  })
}
export function getArchivingCont(params) {
  return service({
    url: `/salarys/reports/${params.yearMonth}`,
    params
  })
}
export function newReport(data) {
  return service({
    url: `/salarys/reports/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}
export function getArchivingExport(params) {
  return service({
    url: `/salarys/reports/${params.yearMonth}/export`,
    params
  })
}
export function getArchivingFirst(params) {
  return service({
    url: `/salarys/reports/${params.yearMonth}/first`,
    params
  })
}
export function getArchivingArchive(data) {
  return service({
    url: `/salarys/reports/${data.yearMonth}/archive`,
    data,
    method: 'post'
  })
}
