import { request } from './request';

export function sendSms(phone) {
  return request({
    url: '/user/sendSms/' + phone
  })
}

export function loginByMessage(phone, code) {  
  return request({
    url: '/user/loginByMessage',
    method: 'post',
    params: {
      phone: phone,
      code: code
    }
  })
}

export function  loginByPassword(username, password) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username: username,
      password: password
    }
  })
}

export function updatePassword(phone, code, newPass) {
  return request({
    url: '/user/updatePassword/' + phone + '/' + code + '/' + newPass,
    method: 'put'
  })
}
