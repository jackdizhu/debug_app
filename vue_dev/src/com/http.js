import axios from 'axios'
import https from 'https'
axios.defaults.timeout = 1000 * 60 * 60
axios.defaults.baseURL = 'http://127.0.0.1:8000/mock/5a522f2eb9574d08787bf76a/app1'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
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
    axios.post(url, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
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
 * request 请求方法
 * @param obj {  url, params, type }
 * @returns {Promise}
 */
function request(obj) {
  let { url, params, type } = obj
  return new Promise((resolve, reject) => {
    let fn;
    if (type === 'POST') {
      fn = post
    } else {
      fn = get
    }
    fn(url, params).then(function (res) {
      let data = res.data || {}
      resolve(data)
    }).catch(err => {
      let status = (err.response && err.response.status) || 0
      console.log(status, 'request catch err')
      resolve({ code: status, err: 'requestErr' })
      // reject(err) // 返回错误
    })
  })
}

export { request }
