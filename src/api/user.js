import request from '@/utils/request'

//获取用户列表
export function userList(data) {
    return request({
      url: '/user/selectByUserInfoPage',
      method: 'post',
      data
    })
}

//获取省份列表
export function provinceList() {
  return request({
    url: '/addr/selectAllProvinces',
    method: 'get'
  })
}