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

/**
 * excel导出
 * @returns
 */
export function exportEmployeeApi() {
  return service({
    url: '/sys/user/export',
    method: 'GET',
    responseType: 'blob'
  })
}

/**
 * 导出下载模版
 * @returns
 */
export function getExportTemplateApi() {
  return service({
    url: '/sys/user/import/template',
    method: 'GET',
    responseType: 'blob'
  })
}

/**
 * 批量-导入员工(上传excel)
 * @param {*} data
 * @returns
 */
export function importEmployeeApi(data) {
  return service({
    url: '/sys/user/import',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

/**
 * 删除-员工
 * @param {*} id
 * @returns
 */
export function removeEmployeeApi(id) {
  return service({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
