'use-strict'

const { body, param, query } = require('express-validator')

exports.logInValidationMiddleware = [
  body('email')
    .notEmpty()
    .withMessage('email must no be empty.')
    .isString()
    .withMessage('email must be a string.')
    .toLowerCase()
    .trim()
    .isEmail()
    .withMessage('email must be a valid email.'),
  body('password')
    .notEmpty()
    .withMessage('password must be a string.')
    .toLowerCase()
    .trim()
    .isAlphanumeric()
    .withMessage('password must be alphanumeric.')
]

exports.signUpValidationMiddleware = [
  body('name')
    .notEmpty()
    .withMessage('name must no be empty.')
    .isString()
    .withMessage('name must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.name.trim()
    }),
  body('lastname')
    .notEmpty()
    .withMessage('lastname must no be empty.')
    .isString()
    .withMessage('lastname must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.lastname.trim()
    }),
  body('email')
    .notEmpty()
    .withMessage('email must no be empty.')
    .isString()
    .withMessage('email must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.email.trim()
    })
    .isEmail()
    .withMessage('email must be a valid email.'),
  body('password')
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
    .withMessage('role must no be empty.')
    .isString()
    .withMessage('role must be a string.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.role.trim()
    })
    .isAlphanumeric()
    .withMessage('password must be alphanumeric.')
]
