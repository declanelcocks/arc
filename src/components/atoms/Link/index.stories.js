import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Link from '.'

storiesOf('Link', module)
  .addWithInfo('default', () => (
    <Link href="https://github.com/diegohaz/arc">ARc repository</Link>
  ))
  .addWithInfo('reverse', () => (
    <Link href="https://github.com/diegohaz/arc" reverse>ARc repository</Link>
  ))
  .addWithInfo('another palette', () => (
    <Link href="https://github.com/diegohaz/arc" palette="secondary">ARc repository</Link>
  ))
