import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Badge from '.'

storiesOf('Badge', module)
  .addWithInfo('default', () => (
    <Badge>Hello</Badge>
  ))
  .addWithInfo('reverse', () => (
    <Badge reverse>Hello</Badge>
  ))
  .addWithInfo('another palette', () => (
    <Badge palette="secondary">Hello</Badge>
  ))
