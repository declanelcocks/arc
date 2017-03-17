import React from 'react'
import { storiesOf } from '@kadira/storybook'
import FeatureList from '.'

storiesOf('FeatureList', module)
  .addWithInfo('default', () => (
    <FeatureList />
  ))
