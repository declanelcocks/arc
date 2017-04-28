import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Molecule from '.'

storiesOf('Molecule', module)
  .addWithInfo('default', () => (
    <Molecule>Hello</Molecule>
  ))
  .addWithInfo('reverse', () => (
    <Molecule reverse>Hello</Molecule>
  ))
