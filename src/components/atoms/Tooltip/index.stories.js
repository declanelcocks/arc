import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Tooltip from '.'

storiesOf('Tooltip', module)
  .addWithInfo('default', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello">
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
  .addWithInfo('reverse', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello!" reverse>
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
  .addWithInfo('position right', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello" position="right">
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
  .addWithInfo('position bottom', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello" position="bottom">
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
  .addWithInfo('position left', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello" position="left">
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
  .addWithInfo('align start', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello! How are you?" align="start">
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
  .addWithInfo('align end', () => (
    <div style={{ margin: 100 }}>
      <Tooltip data-title="Hello! How are you?" align="end">
        <a href="#foo">Hover me</a>
      </Tooltip>
    </div>
  ))
