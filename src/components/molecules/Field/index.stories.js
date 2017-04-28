import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Field from '.'

storiesOf('Field', module)
  .addWithInfo('default', () => (
    <Field name="field" />
  ))
  .addWithInfo('with label', () => (
    <Field name="field" label="Label" />
  ))
  .addWithInfo('invalid', () => (
    <Field name="field" label="Label" invalid />
  ))
  .addWithInfo('invalid with error message', () => (
    <Field name="field" label="Label" error="Invalid" invalid />
  ))
  .addWithInfo('type textarea', () => (
    <Field name="field" label="Label" type="textarea" />
  ))
  .addWithInfo('type select', () => (
    <Field name="field" label="Label" type="select" />
  ))
  .addWithInfo('type checkbox', () => (
    <Field name="field" label="Label" type="checkbox" />
  ))
  .addWithInfo('type radio', () => (
    <Field name="field" label="Label" type="radio" />
  ))
  .addWithInfo('type radio invalid with error message', () => (
    <Field name="field" label="Label" type="radio" error="Invalid" invalid />
  ))
