import service from '@/assets/js/request'

export function getMenu (data = {}) {
  return service({
    url: '/user/getMenuNew',
    method: 'post',
    data
  })
}

export function getSysList (data = {}) {
  return service({
    url: '/user/getSysList',
    method: 'post',
    data
  })
}
