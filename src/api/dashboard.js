import service from '@/utils/request'

/**
 * 首页-展示接口
 * @returns
 */
export function getHomeDataApi() {
  return service({
    url: '/home/data',
    method: 'GET'
  })
}
