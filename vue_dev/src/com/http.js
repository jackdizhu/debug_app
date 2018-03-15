import axios from 'axios'
import https from 'https'
import storage from '../com/com.js'
import router from '../router/index.js'
import { Message } from 'element-ui'

axios.defaults.timeout = 1000 * 60 * 60
// axios.defaults.baseURL = 'http://127.0.0.1:8000/mock/5a522f2eb9574d08787bf76a/app1'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.withCredentials = true // 带cookie 请求
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

var qs = require('qs')

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data)).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * request 请求方法
 * @param obj {  url, params, type }
 * @returns {Promise}
 */
function request (obj) {
  let token = storage.getItem('token') || ''
  let { url, params, type } = obj
  // 增加该 header 值不是简单请求 会发起 options 请求
  // axios.defaults.headers['Authorization'] = token
  params.token = token // 是简单请求
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

  return new Promise((resolve, reject) => {
    let fn = null
    if (type === 'POST') {
      fn = post
    } else {
      fn = get
    }
    fn(url, params).then(function (res) {
      // console.log(res, 'request then')
      // let status = (res.response && res.response.status) || 0
      let data = res.data || {}
      // 处理token验证失效 问题
      if (data.error === 'Authentication Failed') {
        Message.error('登录超时,请重新登录.')
        // storage.removeItem('token')
        router.push({
          path: '/'
        })
        // 返回 错误
        // reject({ code: status, err: 'requestErr' })
        console.log(res, 'Authentication Failed')
      } else {
        resolve(data)
      }
    }).catch(err => {
      console.log(err, 'request catch')
      // let status = (err.response && err.response.status) || 0
      // reject({ code: status, err: 'requestErr' })
    })
  })
}

export { request }
