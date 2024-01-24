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
