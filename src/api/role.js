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
