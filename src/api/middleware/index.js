import jwt from 'jsonwebtoken'

import { User } from 'api/user'

export const isAuthenticated = (req, res, next) => {
  req.isAuthenticated = function() {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token

    try {
      return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
      return false
    }
  }

  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated()

    User.findById(payload.sub, (err, user) => {
      req.user = user
      next()
    })
  } else {
    next()
  }
}
