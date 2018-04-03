import axios from 'axios'
import qs from 'qs'
import {Loading} from 'element-ui'

let loadUi = null
let $axios = axios.create({
  // baseURL: 'v1', // 配置了proxyTable后不需要再使用baseURL
  baseURL: 'http://api.webchat.com/',
  timeout: 15000,
  transformRequest: [function (data) {
    return data instanceof FormData ? data : qs.stringify(data)
  }]
})

// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
  loadUi = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  })
  return config
}, function (error) {
  loadUi && loadUi.close()
  return Promise.reject(error)
})

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
  loadUi && loadUi.close()
  return Promise.resolve(response)
}, function (error) {
  loadUi && loadUi.close()
  return Promise.reject(error)
})

export default $axios
