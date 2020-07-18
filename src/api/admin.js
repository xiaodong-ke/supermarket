import { request } from './request'

export function getCategory() {
  return request({
    url: '/category/getCategory',
    method: 'get'
  })
}

export function addProduct(formdata) {
  return request({
    url: '/product/addProduct',
    method: 'post',
    data: formdata
  })
}

export function addCategory(name) {
  return request({
    url: '/category/addCategory',
    method: 'post',
    params: {
      categoryName: name
    }
  })
}