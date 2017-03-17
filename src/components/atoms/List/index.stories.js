import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from '.'

storiesOf('List', module)
  .addWithInfo('default', () => (
    <List>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  ))
  .addWithInfo('ordered', () => (
    <List ordered>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  ))
  .addWithInfo('palette', () => (
    <List palette="primary">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  ))
  .addWithInfo('palette reverse', () => (
    <List palette="primary" reverse>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  ))
