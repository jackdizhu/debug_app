'use strict'

// const config = require('../config')

const dbHandel = require('../database/index')
const FileModel = dbHandel.getModel('file')

exports.insert = function ({ name, path, nowName }) {
  const file = new FileModel()

  file.name = name
  file.path = path
  file.nowName = nowName

  return file.save()
}

exports.update = function (file) {
  return FileModel.update({
    _id: file._id
  }, {
    $set: {
      msg: file.msg,
      mapFile: file.mapFile,
      key: file.key,
      ext: file.ext
    }
  })
}

exports.getByName = function (fileName) {
  return FileModel.findOne({ name: fileName })
}

exports.getById = function (fileId) {
  return FileModel.findById(fileId)
}

exports.find = function (query, opt) {
  return FileModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return FileModel.findOne(query, {}, opt)
}
