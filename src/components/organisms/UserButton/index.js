import React, { PropTypes } from 'react'
import styled from 'styled-components'

import Button from 'components/atoms/Button'
import LoginModal from 'containers/LoginModal'

const InnerButton = styled.div`
  display: flex;
  align-items: center;
`

const UserButton = ({ user, onLogin, onLogout, ...props }) => {
  return (
    <div>
      {user &&
        <Button {...props} onClick={onLogout}>
          <InnerButton>
            Sign out
          </InnerButton>
        </Button>
      }
      {!user && <Button {...props} onClick={onLogin}>Sign in</Button>}
      <LoginModal />
    </div>
  )
}

UserButton.propTypes = {
  user: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default UserButton
