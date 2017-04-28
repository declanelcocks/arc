import React from 'react'
import { storiesOf } from '@kadira/storybook'
import IconButton from '.'

storiesOf('IconButton', module)
  .addWithInfo('default', () => (
    <IconButton icon="close">Hello</IconButton>
  ))
  .addWithInfo('transparent', () => (
    <IconButton icon="close" transparent>Hello</IconButton>
  ))
  .addWithInfo('with icon on right', () => (
    <IconButton icon="close" right>Hello</IconButton>
  ))
  .addWithInfo('responsive', () => (
    <IconButton icon="close" responsive>Decrease panel width</IconButton>
  ))
  .addWithInfo('responsive with breakpoint', () => (
    <IconButton icon="close" breakpoint={300} responsive>Decrease panel width to 300</IconButton>
  ))
  .addWithInfo('without text', () => (
    <IconButton icon="close" />
  ))
  .addWithInfo('collapsed', () => (
    <IconButton icon="close" collapsed>Hello</IconButton>
  ))
  .addWithInfo('height', () => (
    <IconButton icon="close" height={100}>Hello</IconButton>
  ))
