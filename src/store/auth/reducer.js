import { initialState } from './selectors'
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './actions'

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        user: initialState.user,
      }
    default:
      return state
  }
}
