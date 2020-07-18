import { request } from './request'

export function getProductList(pageNum, pageSize) { 
  return request({
    url: '/product/getProductList/'+ pageNum +'/' + pageSize
  })
}

export function getProductDetail(productId) {
  return request({
    url: '/product/getProductById/' + productId
  })
}

export function addProductToCart(userId, productId, count, specification) {
  return request({
    url: '/cart/addProductToCart',
    method: 'post',
    params: {
      userId: userId,
      productId: productId,
      count: count,
      specification: specification
    }
  })
}

export function getUserCart(userId) {
  return request({
    url: '/cart/getUserCart/' + userId
  })
}

export function removeCart(cartId, userId) {  
  return request({
    url: '/cart/removeCart/' + cartId + '/' + userId,
    method: 'delete'
  })
}

export function updateCartCount(userId, cartId, count) {
  return request({
    url: '/cart/updateCartCount/' + userId + '/' + cartId + '/' + count,
    method: 'put'
  })
}

export function getAddress(userId) {
  return request({
    url: '/user/getAddress/' + userId
  })
}

export function updateAddress(province, city, area, detailAddress, userId) {  
  return request({
    url: '/user/updateAddress',
    method: 'post',
    params: {
      province: province,
      city: city,
      area: area,
      detailAddress: detailAddress,
      userId: userId
    }
  })
}

export function updateUserInfo(formdata) {
  return request({
    url: '/user/updateUserInfo',
    method: 'put',
    data: formdata
  })
}

// export function addOrder(userId, productList, totalMoney) {
//   return request({
//     url: '/order/addOrder',
//     method: 'post',
//     params: {
//       userId: userId,
//       productList: productList,
//       totalMoney: totalMoney
//     }
//   })
// }

export function addOrder(formdata) {
  return request({
    url: '/order/addOrder',
    method: 'post',
    data: formdata
  })
}

export function getOrderList(obj) {
  return request({
    url: '/order/getOrderList',
    params: obj
  })
}

export function returnProduct(orderId) {
  return request({
    url: '/order/returnProduct/' + orderId,
    method: 'put' 
  })
}

export function deleteUserOrder(orderId) {
  return request({
    url: '/order/deleteUserOrder/' + orderId,
    method: 'delete'
  })
}

export function getCommentCount(productId) {
  return request({
    url: '/comment/getCommentCount/' + productId
  })
}

export function getUserInfo(username) {
  return request({
    url: '/user/getUserInfo/' + username
  })
}

export function addComment(productId, username, phone, comment) {
  return request({
    url: '/comment/addComment',
    method: 'post',
    params: {
      productId: productId,
      username: username,
      phone: phone,
      comment: comment
    }
  })
}

export function getProductListByKeyWord(pageNum, pageSize, productName) {
  return request({
    url: '/product/getProductList/' + pageNum + '/' + pageSize,
    params: {
      productName: productName
    }
  })
}

export function getCommentList(productId, pageNum, pageSize) {
  return request({
    url: '/comment/getCommentList/' + productId + '/' + pageNum + '/' + pageSize
  })
}

export function addMoney(userId, money) {
  return request({
    url: '/user/addMoney/' + userId + '/' + money,
    method: 'put'
  })
}