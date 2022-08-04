'use-strict'

/** MIDDLEWARES */
const { logInValidationMiddleware, signUpValidationMiddleware } = require('../middlewares/auth/auth.middleware')

/** CONTROLLERS */
const { logInController, logoutController, signUpController, tokenRefreshController } = require('../controllers/authentication.controller')

exports.routesConfig = (app) => {
  app.post('/api/signup', signUpValidationMiddleware, signUpController)
  app.post('/api/login', logInValidationMiddleware, logInController)
  app.post('/api/token', tokenRefreshController)
  app.post('/api/logout', logoutController)
}
