import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://113.105.246.230:5110/'

// http 拦截器
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    config.header = {
      'Content-type': 'multipart/form-data'
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 统一设置请求
export function fetch (url, params = {}) {
  // eslint-disable-next-ling
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
