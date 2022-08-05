'use-strict'

const { body, param, query } = require('express-validator')

const { getUserByIdService } = require('../../services/users.service')

exports.createUserValidationMiddleware = [
  body('name')
    .notEmpty()
    .withMessage('name must not be empty.')
    .isString()
    .withMessage('name must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.name.trim()
    }),
  body('lastname')
    .notEmpty()
    .withMessage('lastname must not be empty.')
    .isString()
    .withMessage('lastname must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.lastname.trim()
    }),
  body('email')
    .notEmpty()
    .withMessage('email must not be empty.')
    .isString()
    .withMessage('email must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.email.trim()
    })
    .isEmail()
    .withMessage('email must be a vaild email address.'),
  body('password')
    .notEmpty()
    .withMessage('password must not be empty.')
    .isString()
    .withMessage('password must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.password.trim()
    })
    .isAlphanumeric()
    .withMessage('password must be alphanumeric.'),
  body('role')
    .optional()
    .notEmpty()
    .withMessage('role must not be empty.')
    .isString()
    .withMessage('role must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.role.trim()
    })
]

exports.updateUserValidationMiddleware = [
  param('userId')
    .notEmpty()
    .withMessage('userId must not be empty.')
    .isMongoId()
    .withMessage('userId must be a valid string identifier.')
    .custom(async (_value) => {
      const USER_DB = await getUserByIdService(_value).catch((_error) => {
        throw _error
      })

      if (!USER_DB) throw new Error('User does not exist.')

      return true
    }),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('name must not be empty.')
    .isString()
    .withMessage('name must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.name.trim()
    }),
  body('lastname')
    .optional()
    .notEmpty()
    .withMessage('lastname must not be empty.')
    .isString()
    .withMessage('lastname must be a string..')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.lastname.trim()
    }),
  body('email')
    .optional()
    .notEmpty()
    .withMessage('email must not be empty.')
    .isString()
    .withMessage('email must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.email.trim()
    })
    .isEmail()
    .withMessage('email must be a valida email address'),
  body('password')
    .optional()
    .notEmpty()
    .withMessage('password must not be empty.')
    .isString()
    .withMessage('password must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.password.trim()
    }),
  body('role')
    .optional()
    .notEmpty()
    .withMessage('role must not be empty.')
    .isString()
    .withMessage('role must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.role.trim()
    })
]

exports.listUsersValidationMiddleware = [
  query('limit')
    .optional()
    .notEmpty()
    .withMessage('limit must not be empty')
    .isLength({ min: 1, max: 2 })
    .withMessage('maximum number of users per request should not be greater than 99')
    .isNumeric()
    .withMessage('limit must be numeric.'),
  query('page')
    .optional()
    .notEmpty()
    .withMessage('page must not be empty.')
    .isLength({ min: 1, max: 3 })
    .withMessage('maximum number of users per request should not be greater than 999')
    .isNumeric()
    .withMessage('page must be numeric.')
]

exports.checkIdUserValidationMiddleware = [
  param('userId')
    .notEmpty()
    .withMessage('userId must not be empty.')
    .isMongoId()
    .withMessage('userId must be a valid string identifier.')
    .custom(async (_value) => {
      const USER_DB = await getUserByIdService(_value).catch((_error) => {
        throw _error
      })

      if (!USER_DB) throw new Error('User does not exist.')

      return true
    })
]
