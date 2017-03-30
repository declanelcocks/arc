import { initialState } from './selectors'
import * as actions from './actions'
import reducer from './reducer'

const altState = {
  ...initialState,
  user: 5,
}

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles AUTH_LOGIN_SUCCESS', () => {
  const action = { type: actions.AUTH_LOGIN_SUCCESS, user: 1 }

  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    user: 1,
    authenticated: true,
  })

  expect(reducer(altState, action)).toEqual({
    ...initialState,
    user: 1,
    authenticated: true,
  })
})

it('handles AUTH_LOGOUT', () => {
  const action = { type: actions.AUTH_LOGOUT }
  expect(reducer(initialState, action)).toEqual(initialState)
  expect(reducer(altState, action)).toEqual({
    ...altState,
    user: initialState.user,
    authenticated: false,
  })
})
