'use-strict'

const jwt = require('jsonwebtoken')

exports.verifyValidJWT = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ')
      if (authorization[0] !== 'Bearer') {
        return res.status(401).json({
          ok: false,
          data: null,
          message: 'Unauthorized, need a valida token.'
        })
      }
      req.jwt = jwt.verify(authorization[1], process.env.SEED_AUTH)
      return next()
    } catch (error) {
      return res.status(401).json({
        ok: false,
        data: null,
        message: 'Unauthorized, need a valid token. ' + error.message
      })
    }
  } else {
    return res.status(401).json({
      ok: false,
      data: null,
      message: 'A valid token is necessary.'
    })
  }
}
