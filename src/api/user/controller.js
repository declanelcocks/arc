import request from 'request'
import jwt from 'jsonwebtoken'
import moment from 'moment'

import { User } from '.'

export const generateToken = (user) => {
  const payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  }

  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

export const authGithub = (req, res) => {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userUrl = 'https://api.github.com/user';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = {
      'Authorization': 'Bearer ' + accessToken,
      'User-Agent': 'MegaBoilerplate'
    };

    console.log('-------------- authGithub-step1: token', token);
    console.log(params);

    // Step 2. Retrieve user's profile information.
    request.get({ url: userUrl, headers: headers, json: true }, function(err, response, profile) {
      console.log('-------------- authGithub-step2: profile', profile);
      if (profile.error) res.status(500).send({ error: profile.error.message });

      // Step 3a. Link accounts if user is authenticated.
      if (req.isAuthenticated()) {
        console.log('-------------- authGithub-step3a');
        User.findOne({ github: profile.id }, function(err, user) {
          if (user) {
            return res.status(409).send({ error: 'There is already an existing account linked with this Github account.' });
          }

          if (!user) return res.status(401).send({ error: 'Your login has expired.' })

          user = req.user;
          user.name = user.name || profile.name;
          user.github = profile.id;
          user.save(function() {
            res.send({ token: generateToken(user), user: user });
          });
        });
      } else {
        console.log('-------------- authGithub-step3b');
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ github: profile.id }, function(err, user) {
          // User exists
          if (user) return res.send({ token: generateToken(user), user: user });

          user = new User({
            name: profile.name,
            email: profile.email,
            github: profile.id
          });

          user.save(function(err) {
            res.send({ token: generateToken(user), user: user });
          });
        });
      }
    });
  });
}

export const authGithubCallback = ({ res }) => res.send({ msg: 'loading' })
