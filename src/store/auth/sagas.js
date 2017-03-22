import { take, put, call, fork } from 'redux-saga/effects'
import { parse as parseUrl } from 'url'
import {
  parse as parseQueryParams,
  stringify as stringifyQueryParams,
} from 'querystring'

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
  action.type === `AUTH_LOGIN_${suffix}` && action.service === service

export function* loginFacebook({ scope = 'public_profile', fields = 'id,name', ...options } = {}) {
  try {
    yield call(promises.fbLogin, { scope, ...options })
    const data = yield call(promises.fbGetMe, { fields })
    const picture = `https://graph.facebook.com/${data.id}/picture?type=normal`
    yield put(actions.authLoginSuccess({ ...data, picture }))
  } catch (e) {
    yield put(actions.authLoginFailure(e))
  }
}

export function* prepareFacebook({ appId, version = 'v2.8', ...options }) {
  try {
    yield call(appendFbRoot)
    yield call(promises.loadScript, '//connect.facebook.net/en_US/sdk.js')
    yield call([window.FB, window.FB.init], { appId, version, ...options })
  } catch (e) {
    yield put(actions.authLoginFailure(e))
  }
}

export function* watchAuthLoginFacebook() {
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
    yield put(actions.authLoginSuccess({ name, picture }))
  } catch (e) {
    yield put(actions.authLoginFailure(e))
  }
}

export function* prepareGoogle({ client_id, ...options }) {
  try {
    yield call(promises.loadScript, '//apis.google.com/js/platform.js')
    yield call(promises.loadGoogleAuth2)
    yield call(window.gapi.auth2.init, { client_id, ...options })
  } catch (e) {
    yield put(actions.authLoginFailure(e))
  }
}

export function* watchAuthLoginGoogle() {
  const { options } = yield take(serviceAction('PREPARE', 'google'))
  yield call(prepareGoogle, options)
  while (true) {
    const { options } = yield take(serviceAction('REQUEST', 'google'))
    yield call(loginGoogle, options)
  }
}

export function oauth2(config) {
  return new Promise((resolve) => {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      display: 'popup',
      response_type: 'code',
    }

    const url = `${config.authorizationUrl}?${stringifyQueryParams(params)}`
    resolve({ url })
  })
}

export function openPopup({ url, config }) {
  return new Promise((resolve) => {
    const width = config.width || 500
    const height = config.height || 500
    const options = {
      width,
      height,
      top: window.screenY + ((window.outerHeight - height) / 2.5),
      left: window.screenX + ((window.outerWidth - width) / 2),
    }
    const popup = window.open(url, '_blank', stringifyQueryParams(options, ','))

    if (url === 'about:blank') {
      popup.document.body.innerHTML = 'Loading...'
    }

    resolve({ window: popup })
  })
}

export function pollPopup({ window, config, requestToken }) {
  return new Promise((resolve, reject) => {
    const redirectUri = parseUrl(config.redirectUri)
    const redirectUriPath = redirectUri.host + redirectUri.pathname

    if (requestToken) {
      window.location = `${config.authorizationUrl}?${stringifyQueryParams(requestToken)}`
    }

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling)
      }

      try {
        const popupUrlPath = window.location.host + window.location.pathname

        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = parseQueryParams(window.location.search.substring(1).replace(/\/$/, ''))
            const hash = parseQueryParams(window.location.hash.substring(1).replace(/[/$]/, ''))
            const params = Object.assign({}, query, hash)

            if (params.error) {
              reject(params.error)
            } else {
              resolve({ oauthData: params, window, interval: polling })
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

export function closePopup({ window, interval }) {
  return new Promise((resolve) => {
    clearInterval(interval)
    window.close()
    resolve()
  })
}

export function exchangeCodeForToken({ oauthData, config, window, interval }) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config)

    api.post(config.url, data).then(({ token, user }) =>
      resolve({ token, user, window, interval })
    ).catch((err) => {
      reject(err)
      closePopup({ window, interval })
    })
  })
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
    yield put(actions.authLoginSuccess(user))

    yield closePopup({ window: exWindow, interval: exInterval })
  } catch (e) {
    yield put(actions.authLoginFailure(e))
  }
}

export function* watchAuthLoginGithub() {
  while (true) {
    yield take(serviceAction('REQUEST', 'github'))
    yield call(loginGithub)
  }
}

export function* loginLocal({ token }) {
  try {
    const { token, user } = yield api.get('/users')
    localStorage.setItem('token', token)
    yield put(actions.authLoginSuccess(user))
  } catch (e) {
    yield put(actions.authLoginFailure(e))
  }
}

export function* watchAuthLoginLocal() {
  while (true) {
    const { options } = yield take(serviceAction('REQUEST', 'local'))
    yield call(loginLocal, options)
  }
}

export function* watchAuthLogout() {
  while (true) {
    yield take(actions.AUTH_LOGOUT)
    localStorage.removeItem('token')
  }
}

export default function* () {
  yield fork(watchAuthLoginLocal)
  yield fork(watchAuthLoginFacebook)
  yield fork(watchAuthLoginGoogle)
  yield fork(watchAuthLoginGithub)
  yield fork(watchAuthLogout)
}
