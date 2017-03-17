import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Header from '.'

storiesOf('Header', module)
  .addWithInfo('default', () => (
    <Header />
  ))
