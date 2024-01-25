import service from '@/utils/request'

/**
 * 获取-员工列表
 * @param {*} params
 * @returns
 */
export function getEmployeListApi(params) {
  return service({
    url: '/sys/user',
    method: 'GET',
    params
  })
}
