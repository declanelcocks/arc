import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Input from '.'

storiesOf('Input', module)
  .addWithInfo('default', () => (
    <Input />
  ))
  .addWithInfo('reverse', () => (
    <Input reverse />
  ))
  .addWithInfo('height', () => (
    <Input height={100} />
  ))
  .addWithInfo('invalid', () => (
    <Input invalid />
  ))
  .addWithInfo('type textarea', () => (
    <Input type="textarea" />
  ))
  .addWithInfo('type checkbox', () => (
    <Input type="checkbox" />
  ))
  .addWithInfo('type radio', () => (
    <Input type="radio" />
  ))
  .addWithInfo('type select', () => (
    <Input type="select">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Input>
  ))
