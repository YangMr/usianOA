import service from '@/utils/request'

export function getApprovalList(data) {
  return service({
    url: `/user/process/instance/${data.page}/${data.pageSize}`,
    method: 'put',
    data
  })
}
// 获取审批信息
export function getInformation(id) {
  return service({
    url: `/user/process/instance/getById/${id}`
  })
}
export function getReviewHistory(id) {
  return service({
    url: `/approvals/flows/${id}`
  })
}
export function process(data) {
  return service({
    url: '/approvals/process',
    method: 'post',
    data
  })
}
export function getSetState(params) {
  return service({
    url: '/approvals/setting',
    params
  })
}
// 保存状态
export function saveSetState(data) {
  return service({
    url: '/approvals/setting',
    method: 'put',
    data
  })
}
// 获取流程详情
export function getApprovalsDetail(id) {
  return service({
    url: `/user/process/instance/${id}`
  })
}
// 获取流程详情
export function getApprovalsTaskDetail(id) {
  return service({
    url: `/user/process/instance/tasks/${id}`
  })
}
// 下载图片
export function downImg(picture_id) {
  return service({
    url: `//user/process/buss/showBussImgById/${picture_id}`
  })
}
// 获取流程列表
export function getFlowList(params) {
  return service({ url: `/user/process/definition`, params })
}
export function suspend(params) {
  return service({
    url: `/user/process/suspend/${params.processKey}`,
    params
  })
}
export function startProcess(data) {
  return service({
    url: `/user/process/startProcess`,
    data,
    method: 'post'
  })
}
export function applyeLave(data) {
  return service({
    url: `/user/process_leave/startProcess`,
    data,
    method: 'post'
  })
}

// 驳回
export function approvalsReject(data) {
  return service({
    url: `/user/approvals/${data.id}/reject`,
    method: 'put',
    data
  })
}
// 删除
export function approvalsDel(id) {
  return service({
    url: `/user/approvals/${id}`,
    method: 'delete'
  })
}
// 同意
export function approvalsPass(data) {
  return service({
    url: '/user/process/instance/commit',
    method: 'put',
    data
  })
}
export function applyDimission(data) {
  return service({
    url: '/user/process_dimission/startProcess',
    method: 'post',
    data
  })
}
export function applyOvertime(data) {
  return service({
    url: '/user/process_overtime/startProcess',
    method: 'post',
    data
  })
}
export function exportApprovals(data) {
  return service({
    url: `/approvals/export/${data.month}`,
    data
  })
}

export function updateUser(data) {
  return service({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
