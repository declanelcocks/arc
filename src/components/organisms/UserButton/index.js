import React, { PropTypes } from 'react'
import styled from 'styled-components'

import Button from 'components/atoms/Button'
import LoginModal from 'containers/LoginModal'

const InnerButton = styled.div`
  display: flex;
  align-items: center;
`

const UserButton = ({ authenticated, onLogin, onLogout, ...props }) => {
  return (
    <div>
      {authenticated &&
        <Button {...props} onClick={onLogout}>
          <InnerButton>
            Sign out
          </InnerButton>
        </Button>
      }
      {!authenticated && <Button {...props} onClick={onLogin}>Sign in</Button>}
      <LoginModal />
    </div>
  )
}

UserButton.propTypes = {
  authenticated: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default UserButton
