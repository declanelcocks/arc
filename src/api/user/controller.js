import request from 'request'
import jwt from 'jsonwebtoken'
import moment from 'moment'

import { User } from '.'

export const generateToken = (user) => {
  const payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix(),
  }

  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

export const currentUser = (req, res) => {
  if (!req.user) return res.status(401).send({ error: 'Your login has expired.' })

  User.findOne({ _id: req.user._id }, (err, user) =>
    res.send({ token: generateToken(user), user })
  )
}

export const authGithub = (req, res) => {
  const accessTokenUrl = 'https://github.com/login/oauth/access_token'
  const userUrl = 'https://api.github.com/user'

  const params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code',
  }

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, (err, response, token) => {
    const accessToken = token.access_token
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'MegaBoilerplate',
    }

    // Step 2. Retrieve user's profile information.
    request.get({ url: userUrl, headers, json: true }, (err, response, profile) => {
      if (profile.error) return res.status(500).send({ error: profile.error.message })

      // Step 3a. Link accounts if user is authenticated.
      if (req.isAuthenticated()) {
        return User.findOne({ github: profile.id }, (err, user) => {
          if (user) {
            return res.status(409).send({ error: 'There is already an existing account linked with this Github account.' })
          }

          if (!user) return res.status(401).send({ error: 'Your login has expired.' })

          const userWithGithub = req.user
          userWithGithub.name = user.name || profile.name
          userWithGithub.github = profile.id

          return user.save(() => res.send({ token: generateToken(userWithGithub), user: userWithGithub }))
        })
      }

      // Step 3b. Create a new user account or return an existing one.
      return User.findOne({ github: profile.id }, (err, user) => {
        // User exists
        if (user) return res.send({ token: generateToken(user), user })

        const newUser = new User({
          name: profile.name,
          email: profile.email,
          github: profile.id,
        })

        return newUser.save((error) => {
          if (error) return res.status(400).send({ error })

          return res.send({ token: generateToken(newUser), user: newUser })
        })
      })
    })
  })
}

export const authGithubCallback = ({ res }) => res.send({ msg: 'loading' })
