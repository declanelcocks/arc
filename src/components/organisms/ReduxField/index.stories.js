import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ReduxField from '.'

storiesOf('ReduxField', module)
  .addWithInfo('default', () => (
    <ReduxField input={{ name: 'name' }} meta={{}} />
  ))
  .addWithInfo('error', () => (
    <ReduxField input={{ name: 'name' }} meta={{ touched: true, error: 'Invalid' }} />
  ))
