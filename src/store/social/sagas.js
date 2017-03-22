import { take, put, call, fork } from 'redux-saga/effects'
import url from 'url'
import qs from 'querystring'

import api from 'services/api'
import * as actions from './actions'

export const promises = {
  fbLogin: (options) => new Promise((resolve, reject) => {
    window.FB.login((response) => {
      // istanbul ignore else
      if (response.authResponse) {
        resolve(response.authResponse)
      } else {
        reject(response.status)
      }
    }, options)
  }),
  fbGetMe: (options) => new Promise((resolve) => {
    window.FB.api('/me', options, (me) => resolve(me))
  }),
  loadGoogleAuth2: () => new Promise((resolve) => {
    window.gapi.load('auth2', resolve)
  }),
  loadScript: (src) => new Promise((resolve, reject) => {
    const js = document.createElement('script')
    js.src = src
    js.onload = resolve
    js.onerror = reject
    document.head.appendChild(js)
  }),
}

export const appendFbRoot = () => {
  const fbRoot = document.createElement('div')
  fbRoot.id = 'fb-root'
  document.body.appendChild(fbRoot)
}

export const serviceAction = (suffix, service) => (action) =>
  action.type === `SOCIAL_LOGIN_${suffix}` && action.service === service

export function* loginFacebook({ scope = 'public_profile', fields = 'id,name', ...options } = {}) {
  try {
    yield call(promises.fbLogin, { scope, ...options })
    const data = yield call(promises.fbGetMe, { fields })
    const picture = `https://graph.facebook.com/${data.id}/picture?type=normal`
    yield put(actions.socialLoginSuccess({ ...data, picture }))
  } catch (e) {
    yield put(actions.socialLoginFailure(e))
  }
}

export function* prepareFacebook({ appId, version = 'v2.8', ...options }) {
  try {
    yield call(appendFbRoot)
    yield call(promises.loadScript, '//connect.facebook.net/en_US/sdk.js')
    yield call([window.FB, window.FB.init], { appId, version, ...options })
  } catch (e) {
    yield put(actions.socialLoginFailure(e))
  }
}

export function* watchSocialLoginFacebook() {
  const { options } = yield take(serviceAction('PREPARE', 'facebook'))
  yield call(prepareFacebook, options)
  while (true) {
    const { options } = yield take(serviceAction('REQUEST', 'facebook'))
    yield call(loginFacebook, options)
  }
}

export function* loginGoogle({ scope = 'profile', ...options } = {}) {
  try {
    const auth2 = yield call(window.gapi.auth2.getAuthInstance)
    const user = yield call([auth2, auth2.signIn], { scope, ...options })
    const profile = yield call([user, user.getBasicProfile])
    const name = yield call([profile, profile.getName])
    const picture = yield call([profile, profile.getImageUrl])
    yield put(actions.socialLoginSuccess({ name, picture }))
  } catch (e) {
    yield put(actions.socialLoginFailure(e))
  }
}

export function* prepareGoogle({ client_id, ...options }) {
  try {
    yield call(promises.loadScript, '//apis.google.com/js/platform.js')
    yield call(promises.loadGoogleAuth2)
    yield call(window.gapi.auth2.init, { client_id, ...options })
  } catch (e) {
    yield put(actions.socialLoginFailure(e))
  }
}

export function* watchSocialLoginGoogle() {
  const { options } = yield take(serviceAction('PREPARE', 'google'))
  yield call(prepareGoogle, options)
  while (true) {
    const { options } = yield take(serviceAction('REQUEST', 'google'))
    yield call(loginGoogle, options)
  }
}

export function* loginGithub() {
  const config = {
    url: '/auth/github',
    clientId: '8238d57f2bcc4cd3d0c7',
    redirectUri: 'http://localhost:3000/api/auth/github/callback',
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    scope: 'user user:email repo',
    width: 452,
    height: 633,
  }

  try {
    const { url } = yield oauth2(config)
    const { window } = yield openPopup({ url, config })
    const { oauthData, window: ppWindow, interval } = yield pollPopup({ window, config })
    const { token, user, window: exWindow, interval: exInterval } = yield exchangeCodeForToken({ oauthData, config, window: ppWindow, interval })

    localStorage.setItem('token', token)
    yield put(actions.socialLoginSuccess(user))

    yield closePopup({ window: exWindow, interval: exInterval })
  } catch (e) {
    yield put(actions.socialLoginFailure(e))
  }
}

export function* watchSocialLoginGithub() {
  while (true) {
    yield take(serviceAction('REQUEST', 'github'))
    yield call(loginGithub)
  }
}

export function* watchSocialLogout() {
  while (true) {
    yield take(actions.SOCIAL_LOGOUT)
    localStorage.removeItem('token')
  }
}

export default function* () {
  yield fork(watchSocialLoginFacebook)
  yield fork(watchSocialLoginGoogle)
  yield fork(watchSocialLoginGithub)
  yield fork(watchSocialLogout)
}

function oauth2(config) {
  return new Promise((resolve, reject) => {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      display: 'popup',
      response_type: 'code'
    }

    const url = `${config.authorizationUrl}?${qs.stringify(params)}`
    resolve({ url })
  })
}

function openPopup({ url, config }) {
  return new Promise((resolve, reject) => {
    const width = config.width || 500
    const height = config.height || 500
    const options = {
      width,
      height,
      top: window.screenY + ((window.outerHeight - height) / 2.5),
      left: window.screenX + ((window.outerWidth - width) / 2)
    }
    const popup = window.open(url, '_blank', qs.stringify(options, ','))

    if (url === 'about:blank') {
      popup.document.body.innerHTML = 'Loading...'
    }

    resolve({ window: popup })
  })
}

function pollPopup({ window, config, requestToken }) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri)
    const redirectUriPath = redirectUri.host + redirectUri.pathname

    if (requestToken) {
      window.location = config.authorizationUrl + '?' + qs.stringify(requestToken)
    }

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling)
      }

      try {
        const popupUrlPath = window.location.host + window.location.pathname

        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = qs.parse(window.location.search.substring(1).replace(/\/$/, ''))
            const hash = qs.parse(window.location.hash.substring(1).replace(/[\/$]/, ''))
            const params = Object.assign({}, query, hash)

            if (params.error) {
              reject(params.error)
            } else {
              resolve({ oauthData: params, window: window, interval: polling })
            }
          } else {
            reject('OAuth redirect has occurred but no query or hash parameters were found.')
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500)
  })
}

function exchangeCodeForToken({ oauthData, config, window, interval }) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config)

    api.post(config.url, data).then(({ token, user}) =>
      resolve({ token, user, window: window, interval })
    ).catch((err) => {
      reject(err)
      closePopup({ window: window, interval })
    })
  })
}

function closePopup({ window, interval }) {
  return new Promise((resolve, reject) => {
    clearInterval(interval)
    window.close()
    resolve()
  })
}
