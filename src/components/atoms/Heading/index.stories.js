import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Heading from '.'

storiesOf('Heading', module)
  .addWithInfo('default', () => (
    <Heading>Id tempor duis non esse commodo fugiat excepteur nostrud.</Heading>
  ))
  .addWithInfo('palette', () => (
    <Heading palette="primary">Id tempor duis non esse commodo fugiat excepteur nostrud.</Heading>
  ))
  .addWithInfo('palette reverse', () => (
    <Heading palette="primary" reverse>
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .addWithInfo('level 2', () => (
    <Heading level={2}>Id tempor duis non esse commodo fugiat excepteur nostrud.</Heading>
  ))
  .addWithInfo('level 3', () => (
    <Heading level={3}>Id tempor duis non esse commodo fugiat excepteur nostrud.</Heading>
  ))
