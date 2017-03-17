import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Block from '.'

storiesOf('Block', module)
  .addWithInfo('default', () => (
    <Block>Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.</Block>
  ))
  .addWithInfo('reverse', () => (
    <Block reverse>Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.</Block>
  ))
  .addWithInfo('palette', () => (
    <Block palette="primary">Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.</Block>
  ))
  .addWithInfo('palette reverse', () => (
    <Block palette="primary" reverse>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .addWithInfo('palette opaque', () => (
    <Block palette="primary" opaque>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .addWithInfo('palette opaque reverse', () => (
    <Block palette="primary" opaque reverse>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
