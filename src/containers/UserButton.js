import React from 'react'
import { connect } from 'react-redux'
import { fromAuth } from 'store/selectors'
import { modalShow, authLogout } from 'store/actions'

import UserButton from 'components/organisms/UserButton'

const UserButtonContainer = props => <UserButton {...props} />

const mapStateToProps = (state) => ({
  user: fromAuth.getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => dispatch(modalShow('login')),
  onLogout: () => dispatch(authLogout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserButtonContainer)
