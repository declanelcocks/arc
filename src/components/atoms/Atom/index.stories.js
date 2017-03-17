import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Atom from '.'

storiesOf('Atom', module)
  .addWithInfo('default', () => (
    <Atom>Hello</Atom>
  ))
  .addWithInfo('reverse', () => (
    <Atom reverse>Hello</Atom>
  ))
