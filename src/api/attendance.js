import service from '@/utils/request'
// 获取考勤列表
export function getAttendancesList(params) {
  return service({
    url: '/attendances',
    params
  })
}
// 获取考勤详情
export function getAtteArchiveDetail(data) {
  return service({
    url: `/attendances/archive/${data.userId}/${data.yearMonth}`
  })
}
export function updateAttendance(data) {
  return service({
    url: `/attendances/${data.userId}`,
    method: 'put',
    data
  })
}
export function getArchivingList(params) {
  return service({
    url: '/attendances/reports/year',
    params
  })
}
export function getArchivingCont(params) {
  return service({
    url: `/attendances/reports/${params.atteArchiveMonthlyId}`,
    params
  })
}

export function importArchive(data) {
  return service({
    url: '/archive/atte/export',
    method: 'post',
    data
  })
}
// 提醒接口
export function notify() {
  return service({
    url: '/notify/mail',
    method: 'post'
  })
}
export function archives(params) {
  return service({
    url: '/attendances/archives',
    params
  })
}
export function newReports(params) {
  return service({
    url: '/attendances/newReports',
    params
  })
}
export function information() {
  return service({})
}

export function pay() {
  return service({})
}
export function reportFormList(params) {
  return service({
    url: '/attendances/reports',
    params
  })
}

// 请假保存
export function leaveSave(data) {
  return service({
    url: '/cfg/leave',
    method: 'put',
    data
  })
}
// 请假获取
export function getLeave(data) {
  return service({
    url: '/cfg/leave/list',
    method: 'post',
    data
  })
}
// 扣款设置保存
export function deductionsSave(data) {
  return service({
    url: '/cfg/deduction',
    method: 'put',
    data
  })
}
// 获取扣款设置
export function getDeductions(data) {
  return service({
    url: '/cfg/ded/list',
    method: 'post',
    data
  })
}

// 加班配置保存
export function overtimeSave(data) {
  return service({
    url: '/cfg/extDuty',
    method: 'put',
    data
  })
}

// 获取加班配置
export function getOvertime(data) {
  return service({
    url: '/cfg/extDuty/item',
    method: 'post',
    data
  })
}
// 考勤数据保存
export function attendanceSave(data) {
  return service({
    url: '/cfg/atte',
    method: 'put',
    data
  })
}
// 考勤数据保存
export function getAttendance(data) {
  return service({
    url: '/cfg/atte/item',
    method: 'post',
    data
  })
}
export function fileUpdate(data) {
  return service({
    url: `/employee/archives/${data.month}`,
    method: 'put',
    data
  })
}
