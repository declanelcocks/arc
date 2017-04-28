import React from 'react'
import { storiesOf } from '@kadira/storybook'
import PrimaryNavigation from '.'

storiesOf('PrimaryNavigation', module)
  .addWithInfo('default', () => (
    <PrimaryNavigation />
  ))
  .addWithInfo('reverse', () => (
    <PrimaryNavigation reverse />
  ))
