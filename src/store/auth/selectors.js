export const initialState = {
  user: null,
  authenticated: false,
}

export const getUser = (state = initialState) => state.user
export const getAuthenticated = (state = initialState) => state.authenticated
