import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Icon from '.'

storiesOf('Icon', module)
  .addWithInfo('default', () => (
    <Icon icon="close" />
  ))
  .addWithInfo('palette', () => (
    <Icon icon="close" palette="primary" />
  ))
  .addWithInfo('palette reverse', () => (
    <Icon icon="close" palette="primary" reverse />
  ))
  .addWithInfo('height', () => (
    <Icon icon="close" height={100} />
  ))
