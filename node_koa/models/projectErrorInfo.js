'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const ProjectErrorInfoModel = dbHandel.getModel('projectErrorInfo')

exports.insert = function ({projectId, date, msg, mapFile, code, ext}) {
  const project = new ProjectModel()

  projectErrorInfo.projectId = projectId
  projectErrorInfo.date = date
  projectErrorInfo.msg = msg
  projectErrorInfo.mapFile = mapFile
  projectErrorInfo.code = code
  projectErrorInfo.ext = ext

  return projectErrorInfo.save()
}

exports.update = function (projectErrorInfo) {
  return ProjectModel.update({
    _id: projectErrorInfo._id
  }, {
    $set: {
      date: projectErrorInfo.date,
      msg: projectErrorInfo.msg,
      mapFile: projectErrorInfo.mapFile,
      ext: projectErrorInfo.ext
    }
  })
}

exports.getByName = function (projectErrorInfoName) {
  return ProjectErrorInfoModel.findOne({ name: projectErrorInfoName })
}

exports.getById = function (projectErrorInfoId) {
  return ProjectErrorInfoModel.findById(projectErrorInfoId)
}

exports.find = function (query, opt) {
  return ProjectErrorInfoModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return ProjectErrorInfoModel.findOne(query, {}, opt)
}
