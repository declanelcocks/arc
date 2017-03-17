import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Post from '.'

storiesOf('Post', module)
  .addWithInfo('default', () => (
    <Post title="Hello" body="Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua." />
  ))
