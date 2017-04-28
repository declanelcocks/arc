import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Feature from '.'

storiesOf('Feature', module)
  .addWithInfo('default', () => (
    <Feature title="ARc">
      Ullamco duis in labore consectetur ad exercitation esse esse duis mollit sint.
    </Feature>
  ))
  .addWithInfo('with link', () => (
    <Feature title="ARc" link="https://github.com/diegohaz/arc">
      Ullamco duis in labore consectetur ad exercitation esse esse duis mollit sint.
    </Feature>
  ))
  .addWithInfo('with icon', () => (
    <Feature icon="close" title="ARc">
      Ullamco duis in labore consectetur ad exercitation esse esse duis mollit sint.
    </Feature>
  ))
