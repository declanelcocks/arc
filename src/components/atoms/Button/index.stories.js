import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Button from '.'

storiesOf('Button', module)
  .addWithInfo('default', () => (
    <Button>Hello</Button>
  ))
  .addWithInfo('reverse', () => (
    <Button reverse>Hello</Button>
  ))
  .addWithInfo('another palette', () => (
    <Button palette="secondary">Hello</Button>
  ))
  .addWithInfo('disabled', () => (
    <Button disabled>Hello</Button>
  ))
  .addWithInfo('transparent', () => (
    <Button transparent>Hello</Button>
  ))
  .addWithInfo('height', () => (
    <Button height={100}>Hello</Button>
  ))
  .addWithInfo('link', () => (
    <Button href="https://github.com/diegohaz/arc">ARc repository</Button>
  ))
