import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ConfirmModal from '.'

storiesOf('ConfirmModal', module)
  .addWithInfo('default', () => (
    <ConfirmModal
      name="confirm"
      onConfirm={action('confirmed')}
      onClose={action('closed')}
      isOpen
    />
  ))
  .addWithInfo('different button labels', () => (
    <ConfirmModal
      name="confirm"
      confirmLabel="Foo"
      cancelLabel="Bar"
      onConfirm={action('confirmed')}
      onClose={action('closed')}
      isOpen
    />
  ))
  .addWithInfo('different button props', () => (
    <ConfirmModal
      name="confirm"
      confirmLabel="Remove"
      confirmProps={{ color: 'danger' }}
      cancelProps={{ color: 'grayscale' }}
      onConfirm={action('confirmed')}
      onClose={action('closed')}
      isOpen
    >
      Do you really want to remove it?
    </ConfirmModal>
  ))
