import React from 'react'
import { storiesOf } from '@kadira/storybook'
import PrimaryNavigation from '.'

storiesOf('PrimaryNavigation', module)
  .add('default', () => (
    <PrimaryNavigation />
  ))
  .add('reverse', () => (
    <PrimaryNavigation reverse />
  ))
