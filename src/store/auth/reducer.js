import { initialState } from './selectors'
import { AUTH_USER, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './actions'

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
      }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        authenticated: true,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        user: initialState.user,
        authenticated: false,
      }
    default:
      return state
  }
}
