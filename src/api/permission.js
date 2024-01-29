import service from '@/utils/request'

/**
 * 获取权限列表
 * @returns
 */
export function getPermissionListApi() {
  return service({
    url: '/sys/permission',
    method: 'get'
  })
}

/**
 * 获取-权限点详情
 * @returns
 */
export function getPermissionListDetailApi(id) {
  return service({
    url: `/sys/permission/${id}`,
    method: 'get'
  })
}

/**
 * 添加权限
 * @returns
 */
export function addPermissionListApi(data) {
  return service({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 * 编辑权限
 * @returns
 */
export function editPermissionListApi(id, data) {
  return service({
    url: `/sys/permission/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除权限
 * @returns
 */
export function removePermissionListApi(id) {
  return service({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
