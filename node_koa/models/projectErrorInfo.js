'use strict'

// const config = require('../config')

const dbHandel = require('../database/index')
const ProjectErrorInfoModel = dbHandel.getModel('projectErrorInfo')
const ProjectModel = dbHandel.getModel('project')

exports.insert = function ({ projectId, date, msg, filename, line, mapFile, column, code, ext}) {
  const projectErrorInfo = new ProjectErrorInfoModel()
  projectErrorInfo.projectId = projectId
  projectErrorInfo.date = date
  projectErrorInfo.msg = msg
  projectErrorInfo.line = line
  projectErrorInfo.column = column
  projectErrorInfo.filename = filename
  projectErrorInfo.mapFile = mapFile
  projectErrorInfo.code = code
  projectErrorInfo.ext = ext
  log(projectErrorInfo)

  return projectErrorInfo.save()
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
