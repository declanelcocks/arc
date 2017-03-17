import React from 'react'
import { storiesOf } from '@kadira/storybook'
import SamplePage from '.'

storiesOf('SamplePage', module)
  .addWithInfo('default', () => (
    <SamplePage />
  ))
