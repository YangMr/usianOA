import service from '@/utils/request'

/**
 * 获取-部门列表
 * @returns
 */
export function getDepartmentApi() {
  return service({
    url: '/company/department',
    method: 'GET'
  })
}

/**
 * 获取-部门负责人列表
 * @returns
 */
export function getManagerListApi() {
  return service({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

/**
 * 新增-部门
 * @param {*} data
 * @returns
 */
export function addDepartment(data) {
  return service({
    url: '/company/department',
    method: 'POST',
    data
  })
}
