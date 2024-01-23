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
