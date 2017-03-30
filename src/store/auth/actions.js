export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGIN_PREPARE = 'AUTH_LOGIN_PREPARE'
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_USER = 'AUTH_USER'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const authLoginPrepare = (service, options) => ({
  type: AUTH_LOGIN_PREPARE,
  service,
  options,
})

export const authLoginRequest = (service, options) => ({
  type: AUTH_LOGIN_REQUEST,
  service,
  options,
})

export const authLoginSuccess = user => ({
  type: AUTH_LOGIN_SUCCESS,
  user,
})

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error,
})

export const authUser = () => ({ type: AUTH_USER })

export const authLogout = () => ({ type: AUTH_LOGOUT })
