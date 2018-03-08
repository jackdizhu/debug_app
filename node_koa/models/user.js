'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const UserModel = dbHandel.getModel('user')

exports.insert = function ({name, password, email, phone, ext}) {
  const user = new UserModel()

  user.name = name
  user.password = password
  user.email = email
  user.phone = phone
  user.ext = ext

  return user.save()
}

exports.update = function (user) {
  return UserModel.update({
    _id: user._id
  }, {
    $set: {
      email: user.email,
      phone: user.phone,
      password: user.password,
      ext: user.ext
    }
  })
}

exports.getByName = function (userName) {
  return UserModel.findOne({ name: userName })
}

exports.getById = function (userId) {
  return UserModel.findById(userId)
}

exports.find = function (query, opt) {
  return UserModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return UserModel.findOne(query, {}, opt)
}
