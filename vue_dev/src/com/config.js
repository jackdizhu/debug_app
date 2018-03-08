let config, host

let useLocalMock = false

// 开发环境
let devUrl = '/api'
// 生产环境
let prodUrl = '/api'
// 测试环境
let testUrl = '/api'
// 模拟环境
let mockUrl = 'http://127.0.0.1:7300/mock/5a522f2eb9574d08787bf76a/app1'

config = {
  'dev': {
    apiHost: devUrl,
    imgURI: 'http://218.17.30.29:8081/'
  },
  'prod': {
    apiHost: prodUrl,
    imgURI: 'http://218.17.30.29:8081/'
  },
  'mock': {
    apiHost: mockUrl,
    imgURI: 'http://218.17.30.29:8081/'
  }
}

host = config.mock

export default {host}
