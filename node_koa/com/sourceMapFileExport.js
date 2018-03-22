/**
 * 读取 Source Map 文件, 导出其中的源码文件
 *
 * 例如: node source-map-file-export.js test/index.js.map
 *
 * 导出的文件放在 source 目录下面
 */
var path = require('path')
var fs = require('fs')
var path = require('path')

// 写入文件时, 如果上级文件夹不存在, 则会自动创建这个文件夹
var filendir = require('filendir')

// var dist = './source/'
var dist = path.resolve(__dirname, '../data/source/') + '/'

function parseSourceMapFile (file) {
  var mapFilePath = path.resolve(file)
  var sourceMapFileContent = fs.readFileSync(mapFilePath)
  var sourceMap = JSON.parse(sourceMapFileContent)

  console.log('---------------------')
  console.log('mapFilePath', mapFilePath)
  console.log('version', sourceMap.version)
  console.log('file', sourceMap.file)
  console.log('sources.length', sourceMap.sources.length, sourceMap.sourcesContent.length)
  console.log('dist', dist)

  return sourceMap
}

function writeSource (sourceMap) {
  sourceMap.sources.forEach(async function (fileName, index) {
    // 特别关照下 webpack, 否则无法创建这样的文件夹
    fileName = fileName.replace('webpack:///', '')
    fileName = fileName.replace(/\?[^\n]+/, '')
    if (/\.[a-z]+$/.test(fileName)) {
      var fileContent = sourceMap.sourcesContent[index]
      try {
        await filendir.writeFileSync(dist + fileName, fileContent, { encoding: 'utf8', mode: 438 ,flag: 'w+' })
      } catch (error) {
        // log(error)
      }
    }
  })
}

const mapFile = (mapFile, id) => {
  dist = path.resolve(__dirname, '../data/' + (id || 'source') +'/') + '/'
  writeSource(parseSourceMapFile(mapFile))
}
const sourceMap = (sourceMap, id) => {
  dist = path.resolve(__dirname, '../data/' + (id || 'source') + '/') + '/'
  writeSource(sourceMap)
}

// module.exports = { mapFile, sourceMap }
module.exports = sourceMap
