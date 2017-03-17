import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Blockquote from '.'

storiesOf('Blockquote', module)
  .addWithInfo('default', () => (
    <Blockquote>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Blockquote>
  ))
  .addWithInfo('reverse', () => (
    <Blockquote reverse>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Blockquote>
  ))
  .addWithInfo('with cite', () => (
    <Blockquote cite="Foo">
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Blockquote>
  ))
