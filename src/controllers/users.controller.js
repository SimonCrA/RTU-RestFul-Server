'use-strict'

const bcrypt = require('bcrypt')
const { createNewUserService, listUsersService, getUserByIdService, updateUserService } = require('../services/users.service')
const { validationResult } = require('express-validator')

exports.createNewUserController = async (req, res) => {
  try {
    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.array()
      })
    }
    const { password } = req.body

    //hash Password
    const hashedPassword = await bcrypt.hashSync(password, 10)
    req.body.password = hashedPassword

    const userCreated = await createNewUserService(req.body).catch((_error) => {
      throw _error
    })
    res.status(201).json({
      ok: true,
      data: {
        id: userCreated._id
      },
      message: 'Usuario creado satisfactoriamente.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'API is not available for now.'
    })
  }
}

exports.UpdateUserController = async (req, res) => {
  try {
    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.array()
      })
    }

    const { userId } = req.params
    const { password } = req.body

    if (password) {
      //hash Password
      req.body.password = await bcrypt.hashSync(password, 10)
    }
    const USER_UPDATED = await updateUserService(userId, req.body).catch((_error) => {
      throw _error
    })
    if (!USER_UPDATED) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'User not found.'
      })
    }
    res.status(200).json({
      ok: true,
      data: {
        id: USER_UPDATED._id
      },
      message: 'User updated.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'API is not available for now.'
    })
  }
}

exports.listUsersController = async (req, res) => {
  try {
    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.array()
      })
    }

    let { limit, page } = req.query

    limit = limit && limit <= 100 ? parseInt(limit) : 10
    page = page && Number.isInteger(page) ? parseInt(page) : 0

    const USERS = await listUsersService().catch((_error) => {
      throw _error
    })

    res.status(200).json({
      ok: true,
      data: USERS,
      message: 'Users list.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'API is not available for now.'
    })
  }
}

exports.getUserByIdController = async (req, res) => {
  try {
    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.array()
      })
    }

    const { userId } = req.params
    const USER = await getUserByIdService(userId).catch((_error) => {
      throw _error
    })

    if (!USER) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'User not found.'
      })
    }
    res.status(200).json({
      ok: true,
      data: USER,
      message: 'User detail.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'API is not available for now.'
    })
  }
}

exports.deleteUserController = async (req, res) => {
  try {
    //Validations
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        err: validationErrors.array()
      })
    }

    const { userId } = req.params

    let status = {
      status: false
    }
    const USER_UPDATED = await updateUserService(userId, status).catch((_error) => {
      throw _error
    })
    if (!USER_UPDATED) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'User not found.'
      })
    }
    res.status(200).json({
      ok: true,
      data: {
        id: USER_UPDATED._id
      },
      message: 'User deleted.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'API is not available for now.'
    })
  }
}
