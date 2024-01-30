import service from '@/utils/request'

export function getArchivingCont(params) {
  return service({
    url: `/social_securitys/historys/${params.month}`,
    params
  })
}

export function getArchivingList(data) {
  return service({
    url: `/social_securitys/historys/${data.year}/list`,
    data
  })
}
export function newReport(data) {
  return service({
    url: `/social_securitys/historys/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}
export function getHistorysData(data) {
  return service({
    url: `/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`,
    data
  })
}
export function getArchivingExport(data) {
  return service({
    url: `/social_securitys/historys/${data.yearMonth}/export`,
    data
  })
}
export function getArchivingFirst(data) {
  return service({
    url: `/social_securitys/historys/${data.yearMonth}/first`,
    data
  })
}
export function getSocialList(data) {
  return service({
    url: '/social_securitys/list',
    method: 'post',
    data
  })
}
export function getArchivingArchive(data) {
  return service({
    url: `/social_securitys/historys/${data.yearMonth}/archive`,
    method: 'post',
    data
  })
}

export function getTips(yearMonth) {
  return service({
    url: `/social_securitys/tips/${yearMonth}`
  })
}
export function saveContent(data) {
  return service({
    url: `/social_securitys/${data.userId}`,
    method: 'put',
    data
  })
}
export function getContent(userId) {
  return service({
    url: `/social_securitys/${userId}`
  })
}
export function getPaymentItemList(id) {
  return service({
    url: `/social_securitys/payment_item/${id}`
  })
}
export function getSettings() {
  return service({
    url: '/social_securitys/settings'
  })
}
export function saveSettings(data) {
  return service({
    url: '/social_securitys/settings',
    data,
    method: 'post'
  })
}
