/**
 * promise 数据处理
 *
 * @author LiuCaiHe at 2017-08-05
 */

import axios from 'axios'
import Qs from 'qs'

import router from '../router'

import {
  apiUrl,
  APPKEY
} from './env'

import {
  __joinObj
} from './util'

axios.defaults.baseURL = apiUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 100000

// 请求拦截器 (在发送请求之前)
axios.interceptors.request.use((res) => {
  if (res.method === 'post') {
    res.data.app_key = APPKEY
    // 当前时间戳
    res.data.timestamp = new Date().getTime()
    res.data.token = window.sessionStorage.getItem('token')
    res.data.sign = __joinObj(res.data)
    res.data = Qs.stringify(res.data)
  }

  return res
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  if (res.data.code === 10011 || res.data.code === 10012 || res.data.code === 10013 || res.data.code === 10014 || res.data.code === 10021 || res.data.code === 10022) {
    window.sessionStorage.removeItem('token')
    // if (res.data.code === 10011) {
    //   alert('非法请求，缺少系统级参数')
    // }
    // if (res.data.code === 10012) {
    //   alert('非法请求，未知的调用方')
    // }
    // if (res.data.code === 10013) {
    //   alert('非法请求，请求过期')
    // }
    // if (res.data.code === 10014) {
    //   alert('非法请求，签名sign验证失败')
    // }
    // if (res.data.code === 10021) {
    //   alert('您还没有登录呢，登录后才可享受优惠哦~')
    // }
    // if (res.data.code === 10022) {
    //   alert('您的账号在另一个手机上登录，请重新登录')
    // }
    router.replace({
      name: 'login'
    })
  }
  return res
}, (error) => {
  if (error.response) {
    console.log(error.response)
  }
  return Promise.reject(error)
})

export default axios
