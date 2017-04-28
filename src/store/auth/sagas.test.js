import { put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import saga, * as sagas from './sagas'

const profile = { getName: () => 'name', getImageUrl: () => 'imageUrl' }
const user = { getBasicProfile: () => profile }
const auth2 = { signIn: () => user }

window.gapi = {
  load: () => {},
  auth2: {
    init: () => auth2,
    getAuthInstance: () => auth2,
  },
}

window.FB = {
  init: () => {},
  login: (cb) => cb({ authResponse: 'foo' }),
  api: (endpoint, options, cb) => cb(),
}

describe('promises', () => {
  Object.keys(sagas.promises).forEach((promiseName) => {
    test(`${promiseName} returns a promise`, () => {
      const promise = sagas.promises[promiseName]
      expect(promise()).toBeInstanceOf(Promise)
    })
  })

  test('oauth2 returns a promise', () => {
    const promise = sagas.oauth2
    expect(promise()).toBeInstanceOf(Promise)
  })

  test('openPopup returns a promise', () => {
    const payload = { url: {}, config: {} }
    const promise = sagas.openPopup
    expect(promise(payload)).toBeInstanceOf(Promise)
  })

  test('closePopup returns a promise', () => {
    const payload = { window: {}, interval: {} }
    const promise = sagas.closePopup
    expect(promise(payload)).toBeInstanceOf(Promise)
  })
})

test('appendFbRoot', () => {
  expect(document.querySelector('div#fb-root')).toBeFalsy()
  sagas.appendFbRoot()
  expect(document.querySelector('div#fb-root')).toBeTruthy()
})

test('serviceAction', () => {
  const action = (suffix, service) => ({ type: `AUTH_LOGIN_${suffix}`, service })
  expect(sagas.serviceAction('REQUEST', 'facebook')(action('REQUEST', 'facebook'))).toBe(true)
  expect(sagas.serviceAction('REQUEST', 'facebook')(action('PREPARE', 'facebook'))).toBe(false)
  expect(sagas.serviceAction('REQUEST', 'facebook')(action('REQUEST', 'google'))).toBe(false)
})

describe('loginFacebook', () => {
  it('calls success', () => {
    const generator = sagas.loginFacebook()
    expect(generator.next().value)
      .toEqual(call(sagas.promises.fbLogin, { scope: 'public_profile' }))
    expect(generator.next().value).toEqual(call(sagas.promises.fbGetMe, { fields: 'id,name' }))
    expect(generator.next({ id: '123', name: 'name' }).value)
      .toEqual(put(actions.authLoginSuccess({
        id: '123',
        name: 'name',
        picture: 'https://graph.facebook.com/123/picture?type=normal',
      })))
  })

  it('calls failure', () => {
    const generator = sagas.loginFacebook()
    expect(generator.next().value)
      .toEqual(call(sagas.promises.fbLogin, { scope: 'public_profile' }))
    expect(generator.throw('test').value).toEqual(put(actions.authLoginFailure('test')))
  })
})

describe('prepareFacebook', () => {
  it('calls success', () => {
    const generator = sagas.prepareFacebook({ appId: 'test', foo: 'bar' })
    expect(generator.next().value).toEqual(call(sagas.appendFbRoot))
    expect(generator.next().value)
      .toEqual(call(sagas.promises.loadScript, '//connect.facebook.net/en_US/sdk.js'))
    expect(generator.next().value)
      .toEqual(call([window.FB, window.FB.init], { appId: 'test', version: 'v2.8', foo: 'bar' }))
  })

  it('calls failure', () => {
    const generator = sagas.prepareFacebook({ appId: 'test' })
    expect(generator.next().value).toEqual(call(sagas.appendFbRoot))
    expect(generator.throw('test').value).toEqual(put(actions.authLoginFailure('test')))
  })
})

test('watchAuthLoginFacebook', () => {
  const payload = { options: 1 }
  const generator = sagas.watchAuthLoginFacebook()
  generator.next()
  expect(generator.next(payload).value).toEqual(call(sagas.prepareFacebook, 1))
  generator.next()
  expect(generator.next(payload).value).toEqual(call(sagas.loginFacebook, 1))
})

describe('loginGoogle', () => {
  it('calls success', () => {
    const generator = sagas.loginGoogle()
    expect(generator.next().value).toEqual(call(window.gapi.auth2.getAuthInstance))
    expect(generator.next(auth2).value).toEqual(call([auth2, auth2.signIn], { scope: 'profile' }))
    expect(generator.next(user).value).toEqual(call([user, user.getBasicProfile]))
    expect(generator.next(profile).value).toEqual(call([profile, profile.getName]))
    expect(generator.next('name').value).toEqual(call([profile, profile.getImageUrl]))
    expect(generator.next('imageUrl').value)
      .toEqual(put(actions.authLoginSuccess({ name: 'name', picture: 'imageUrl' })))
  })

  it('calls failure', () => {
    const generator = sagas.loginGoogle()
    expect(generator.next().value).toEqual(call(window.gapi.auth2.getAuthInstance))
    expect(generator.throw('test').value).toEqual(put(actions.authLoginFailure('test')))
  })
})

describe('prepareGoogle', () => {
  it('calls success', () => {
    const generator = sagas.prepareGoogle({ client_id: 'test', foo: 'bar' })
    expect(generator.next().value)
      .toEqual(call(sagas.promises.loadScript, '//apis.google.com/js/platform.js'))
    expect(generator.next().value).toEqual(call(sagas.promises.loadGoogleAuth2))
    expect(generator.next().value)
      .toEqual(call(window.gapi.auth2.init, { client_id: 'test', foo: 'bar' }))
  })

  it('calls failure', () => {
    const generator = sagas.prepareGoogle({ client_id: 'test' })
    expect(generator.next().value)
      .toEqual(call(sagas.promises.loadScript, '//apis.google.com/js/platform.js'))
    expect(generator.throw('test').value).toEqual(put(actions.authLoginFailure('test')))
  })
})

test('watchAuthLoginGoogle', () => {
  const payload = { options: 1 }
  const generator = sagas.watchAuthLoginGoogle()
  generator.next()
  expect(generator.next(payload).value).toEqual(call(sagas.prepareGoogle, 1))
  generator.next()
  expect(generator.next(payload).value).toEqual(call(sagas.loginGoogle, 1))
})

test('watchAuthLoginGithub', () => {
  const generator = sagas.watchAuthLoginGithub()
  generator.next()
  expect(generator.next().value).toEqual(call(sagas.loginGithub))
})

test('saga', () => {
  const generator = saga()
  expect(generator.next().value).toEqual(fork(sagas.watchAuthLoginLocal))
  expect(generator.next().value).toEqual(fork(sagas.watchAuthLoginFacebook))
  expect(generator.next().value).toEqual(fork(sagas.watchAuthLoginGoogle))
  expect(generator.next().value).toEqual(fork(sagas.watchAuthLoginGithub))
  expect(generator.next().value).toEqual(fork(sagas.watchAuthLogout))
})