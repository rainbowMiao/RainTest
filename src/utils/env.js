/**
 * 开发环境及生产环境配置切换
 *
 * @param {String} apiUrl API URL
 * @param {String} routerMode 路由模式
 * @param {String} APPKEY 请求来源
 * @param {String} APPSECRET 参与签名私钥
 * @param {String} APPID 微信APPID
 * @param {String} RMODE vue-router 模式
 */

let apiUrl
let RBASE
if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://mcs.czb365.com/services/v3/'
} else {
  apiUrl = 'http://test.mcs.czb365.com/services/v3/'
}

const APPKEY = 'm1.0'
const APPSECRET = '8de81bb5f4e7c0efba518379bff7aff6'
const APPID = 'wxba9c1a2dc695917b'
const RMODE = 'history'

export {
  apiUrl,
  APPKEY,
  APPSECRET,
  APPID,
  RMODE,
  RBASE
}
