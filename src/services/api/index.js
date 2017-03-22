import 'isomorphic-fetch'
import cookie from 'react-cookie'
import { stringify } from 'query-string'
import merge from 'lodash/merge'
import { apiUrl } from 'config'

export const checkStatus = (response) => {
  if (response.ok) {
    return response
  }
  const error = new Error(`${response.status} ${response.statusText}`)
  error.response = response
  throw error
}

const parseJSON = (response) =>
  new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })))

export const parseSettings = ({ method = 'get', data, locale, authorization, ...otherSettings } = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
    authorization: authorization ? `Bearer ${authorization}` : undefined,
  }

  const settings = {
    body: data ? JSON.stringify(data) : undefined,
    method,
    headers,
    ...otherSettings,
  }

  return settings
}

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint
  const querystring = params ? `?${stringify(params)}` : ''
  return `${url}${querystring}`
}

const api = {}

api.request = (endpoint, { params, ...settings } = {}) => {
  settings.authorization = cookie.load('token')

  return new Promise((resolve, reject) =>
    fetch(parseEndpoint(endpoint, params), parseSettings(settings))
      .then(parseJSON)
      .then((response) => {
        if (response.ok) return resolve(response.json)

        // Extract the error from the server's json
        // Expects the API to respond to an error with:
        // response: { error: 'This is an error message' }
        return reject(response.json.error)
      })
      .catch((error) => reject({
        networkError: error.message,
      }))
  )
}

;['delete', 'get'].forEach((method) => {
  api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings })
})

;['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings })
})

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    }
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    }
  },

  request(endpoint, settings) {
    return api.request(endpoint, merge({}, this.settings, settings))
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'post', data, ...settings })
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: 'get', ...settings })
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'put', data, ...settings })
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'patch', data, ...settings })
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings })
  },
})

export default api
