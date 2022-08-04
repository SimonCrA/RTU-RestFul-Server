'use-strict'
const User = require('../models/users.model')

exports.findUserByEmailService = async (_email) => {
  try {
    //Check if the email already exists in the database
    return await User.findOne({ email: _email, status: true }).catch((_error) => {
      throw new Error(_error.message)
    })
  } catch (_error) {
    console.error(_error)
  }
}

exports.createNewUserService = async (_data) => {
  try {
    return await new User(_data).save().catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}

exports.listUsersService = async (_limit = 10, _page = 0) => {
  try {
    const USER_LIST = await User.find({ status: true })
      .select('role name lastname email')
      .limit(_limit)
      .skip(_limit * _page)
      .exec()
      .catch((_error) => {
        throw _error
      })

    const USER_COUNT = await User.find()
      .countDocuments({})
      .catch((_error) => {
        throw _error
      })

    return {
      count: USER_COUNT,
      data: USER_LIST
    }
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}

exports.getUserByIdService = async (_id) => {
  try {
    return await User.findById({ _id, status: true }).catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}

exports.updateUserService = async (_id, _data) => {
  try {
    return await User.findOneAndUpdate({ _id, status: true }, _data, { useFindAndModify: false }).catch((_error) => {
      throw _error
    })
  } catch (_error) {
    throw new Error(`userService ${_error}`)
  }
}
