import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LogoImage from '.'

storiesOf('LogoImage', module)
  .addWithInfo('default', () => (
    <LogoImage width={200} />
  ))
