import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import LoginModal from '.'

storiesOf('LoginModal', module)
  .addWithInfo('default', () => (
    <LoginModal
      onFacebookLogin={action('facebook')}
      onGoogleLogin={action('google')}
      onClose={action('closed')}
      isOpen
    />
  ))
