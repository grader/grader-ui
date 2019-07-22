import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/signin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/users/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/auth/signout',
    method: 'get'
  })
}
