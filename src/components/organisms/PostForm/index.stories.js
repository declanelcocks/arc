import React from 'react'
import { storiesOf } from '@kadira/storybook'
import PostForm from '.'

storiesOf('PostForm', module)
  .add('default', () => (
    <PostForm />
  ))
