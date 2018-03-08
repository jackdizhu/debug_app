'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const UserModel = dbHandel.getModel('user')

exports.insert = function ({name, password, nickName, headImg}) {
  const user = new UserModel()

  user.name = name
  user.password = password
  user.nick_name = nickName || 'nickName'
  user.head_img = headImg || config.headImg

  return user.save()
}

exports.update = function (user) {
  return UserModel.update({
    _id: user._id
  }, {
    $set: {
      nick_name: user.nick_name,
      head_img: user.head_img,
      password: user.password
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
