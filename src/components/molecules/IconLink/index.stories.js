import React from 'react'
import { storiesOf } from '@kadira/storybook'
import IconLink from '.'

storiesOf('IconLink', module)
  .addWithInfo('default', () => (
    <IconLink icon="close" href="#">Hello</IconLink>
  ))
  .addWithInfo('right', () => (
    <IconLink icon="close" href="#" right>Hello</IconLink>
  ))
  .addWithInfo('inside paragraph', () => (
    <p>Consequat cupidatat id <IconLink icon="close" href="#">excepteur</IconLink> ex nisi proident et sunt fugiat id pariatur.</p>
  ))
