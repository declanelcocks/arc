import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Modal from '.'

storiesOf('Modal', module)
  .addWithInfo('default', () => (
    <Modal onClose={action('closed')} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .addWithInfo('with title', () => (
    <Modal onClose={action('closed')} title="Hello" isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .addWithInfo('closeable', () => (
    <Modal onClose={action('closed')} closeable isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .addWithInfo('reverse', () => (
    <Modal onClose={action('closed')} reverse isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
