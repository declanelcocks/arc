import React from 'react'
import { storiesOf } from '@kadira/storybook'
import HomePage from '.'

storiesOf('HomePage', module)
  .addWithInfo('default', () => (
    <HomePage />
  ))
