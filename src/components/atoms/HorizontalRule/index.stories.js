import React from 'react'
import { storiesOf } from '@kadira/storybook'
import HorizontalRule from '.'

storiesOf('HorizontalRule', module)
  .addWithInfo('default', () => (
    <HorizontalRule />
  ))
  .addWithInfo('palette', () => (
    <HorizontalRule palette="primary" />
  ))
  .addWithInfo('palette reverse', () => (
    <HorizontalRule palette="primary" reverse />
  ))
