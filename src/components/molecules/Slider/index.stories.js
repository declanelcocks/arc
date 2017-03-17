import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Slider from '.'

storiesOf('Slider', module)
  .addWithInfo('default', () => (
    <Slider />
  ))
  .addWithInfo('reverse', () => (
    <Slider reverse min={0} max={10} step={0.05} defaultValue={5} />
  ))
  .addWithInfo('disabled', () => (
    <Slider disabled min={0} max={10} step={0.05} defaultValue={5} />
  ))
  .addWithInfo('responsive with breakpoint', () => (
    <Slider responsive min={0} max={10} step={0.05} defaultValue={5} breakpoint={450} />
  ))
