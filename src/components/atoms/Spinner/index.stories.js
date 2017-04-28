import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Spinner from '.'

storiesOf('Spinner', module)
  .addWithInfo('default', () => (
    <Spinner />
  ))
  .addWithInfo('reverse', () => (
    <Spinner reverse />
  ))
  .addWithInfo('another palette', () => (
    <Spinner palette="secondary" />
  ))
