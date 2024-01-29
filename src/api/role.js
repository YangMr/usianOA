import service from '@/utils/request'

/**
 * 获取-分页查询角色列表
 * @param {*} params
 * @returns
 */
export function getRoleListApi(params) {
  return service({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

/**
 * 新增-角色
 * @param {*} data
 * @returns
 */
export function addRoleApi(data) {
  return service({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 修改-角色
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function updateRoleInfoApi(id, data) {
  return service({
    url: `/sys/role/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除-角色
 * @param {*} id
 * @returns
 */
export function removeRoleApi(id) {
  return service({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取-已启用的角色列表
 * @returns
 */
export function getEnableRoleListApi() {
  return service({
    url: '/sys/role/list/enabled',
    method: 'GET'
  })
}

/**
 * 获取-角色详情
 * @param {*} id
 * @returns
 */
export function getRoleDetailApi(id) {
  return service({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

/**
 * 分配权限-角色
 * @param {*} data
 * @returns
 */
export function assignPremissionApi(data) {
  return service({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
