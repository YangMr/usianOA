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

/**
 * 获取-部门详情
 * @param {number} id
 * @returns
 */
export function getDepartmentDetailApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

/**
 * 修改-部门详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function updateDepartmentApi(id, data) {
  console.log('id=>', id)
  return service({
    url: `/company/department/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除-部门
 * @param {number} id
 * @returns
 */
export function removeDepartmentApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
