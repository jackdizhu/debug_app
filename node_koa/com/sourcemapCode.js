const sourcemapCode = (originalPosition, id) => {
  var path = require('path')
  var fs = require('fs')

  file = path.resolve(__dirname, '../data/' + id + '/' + originalPosition.source)

  let _txt = fs.readFileSync(file, 'utf8')

  let code = ''
  let lines = _txt.split('\n')
  let _nline = 5
  let _sline = originalPosition.line - _nline
  let _eline = originalPosition.line + _nline
  for (let i = _sline; i < _eline; i++) {
    // log(lines[i], 'string')
    if (!lines[i]) {
      break
    }
    let n = ''
    if (i + 1 === originalPosition.line) {
      n = i + 1 + '>|'
    } else {
      n = i + 1 + ' |'
    }
    code += n + lines[i] +'\n'
  }
  return code
}

module.exports = sourcemapCode
