import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Organism from '.'

storiesOf('Organism', module)
  .addWithInfo('default', () => (
    <Organism />
  ))
  .addWithInfo('reverse', () => (
    <Organism reverse />
  ))
