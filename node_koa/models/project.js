'use strict'

// const config = require('../config')

const dbHandel = require('../database/index')
const ProjectModel = dbHandel.getModel('project')

exports.insert = function ({ name, date, user_id, msg, mapFile, mapFileUrl, key, ext}) {
  const project = new ProjectModel()

  project.name = name
  project.date = date
  project.user_id = user_id
  project.msg = msg
  project.mapFile = mapFile
  project.mapFileUrl = mapFileUrl
  project.key = key
  project.ext = ext

  return project.save()
}

exports.update = function (project) {
  return ProjectModel.update({
    _id: project._id
  }, {
    $set: {
      msg: project.msg,
      mapFile: project.mapFile,
      mapFileUrl: project.mapFileUrl,
      key: project.key,
      ext: project.ext
    }
  })
}

exports.getByName = function (projectName) {
  return ProjectModel.findOne({ name: projectName })
}

exports.getById = function (projectId) {
  return ProjectModel.findById(projectId)
}

exports.find = function (query, opt) {
  return ProjectModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return ProjectModel.findOne(query, {}, opt)
}
