import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://106.55.151.225:8888',
    // timeout: 5000
  })

  instance.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })

  return instance(config);
}