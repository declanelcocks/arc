import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Label from '.'

storiesOf('Label', module)
  .addWithInfo('default', () => (
    <Label>Hello</Label>
  ))
  .addWithInfo('reverse', () => (
    <Label reverse>Hello</Label>
  ))
