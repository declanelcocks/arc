import React from 'react'
import { configure, addDecorator, setAddon } from '@kadira/storybook'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import infoAddon from '@kadira/react-storybook-addon-info';

import configureStore from 'store/configure'
import theme from 'components/themes/default'

const store = configureStore({})
const req = require.context('components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

setAddon(infoAddon)

addDecorator(story => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </Provider>
))

configure(loadStories, module)
