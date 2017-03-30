import 'babel-polyfill'
import React from 'react'
import cookie from 'react-cookie'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createHistory } from 'history'
import { match, Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'
import { authLoginRequest } from 'store/actions'
import routes from 'routes'
import FontFaceObserver from 'fontfaceobserver'

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__
const baseHistory = useRouterHistory(createHistory)({ basename })
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

const token = cookie.load('token')
if (initialState.auth.authenticated && token) {
  store.dispatch(authLoginRequest('local', { token }))
}

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const fontObserver = new FontFaceObserver('Muli', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
fontObserver.load().then(() => {
  document.body.classList.add('fontloaded');
}, () => {
  document.body.classList.remove('fontloaded');
});

const renderApp = () => {
  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Router key={Math.random()} {...renderProps} />
        </Provider>
      </AppContainer>,
      root,
    )
  })
}

if (module.hot) {
  module.hot.accept('routes', () => {
    renderApp()
  })
}

renderApp()
