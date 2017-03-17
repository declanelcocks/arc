import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Caption from '.'

storiesOf('Caption', module)
  .addWithInfo('default', () => (
    <Caption>Hello</Caption>
  ))
  .addWithInfo('reverse', () => (
    <Caption reverse>Hello</Caption>
  ))
