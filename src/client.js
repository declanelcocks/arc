import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createHistory } from 'history'
import { match, Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'
import routes from 'routes'

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__
const baseHistory = useRouterHistory(createHistory)({ basename })
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

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
