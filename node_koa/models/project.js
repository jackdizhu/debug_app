'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const ProjectModel = dbHandel.getModel('project')

exports.insert = function ({name, msg, mapFile, key, ext}) {
  const project = new ProjectModel()

  project.name = name
  project.msg = msg
  project.mapFile = mapFile
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
