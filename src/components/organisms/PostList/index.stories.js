import React from 'react'
import { storiesOf } from '@kadira/storybook'
import PostList from '.'

const list = [
  { id: 0, title: 'Post 1', body: 'Voluptate ullamco anim exercitation deserunt cillum ullamco.' },
  { id: 1, title: 'Post 1', body: 'Voluptate ullamco anim exercitation deserunt cillum ullamco.' },
  { id: 2, title: 'Post 1', body: 'Voluptate ullamco anim exercitation deserunt cillum ullamco.' },
  { id: 3, title: 'Post 1', body: 'Voluptate ullamco anim exercitation deserunt cillum ullamco.' },
]

storiesOf('PostList', module)
  .addWithInfo('default', () => (
    <PostList list={list} />
  ))
  .addWithInfo('loading', () => (
    <PostList list={[]} loading />
  ))
