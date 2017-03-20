import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fbAppId, googleClientId } from 'config'
import { fromAuth } from 'store/selectors'
import { authLoginPrepare, authLoginRequest, modalHide } from 'store/actions'

import LoginModal from 'components/organisms/LoginModal'

class LoginModalContainer extends Component {
  static propTypes = {
    prepareGoogle: PropTypes.func.isRequired,
    prepareFacebook: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.prepareGoogle()
    this.props.prepareFacebook()
  }

  render() {
    return <LoginModal {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  user: fromAuth.getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
  prepareGoogle: () => dispatch(authLoginPrepare('google', { client_id: googleClientId })),
  prepareFacebook: () => dispatch(authLoginPrepare('facebook', { appId: fbAppId })),
  onFacebookLogin: () => dispatch(authLoginRequest('facebook')),
  onGoogleLogin: () => dispatch(authLoginRequest('google')),
  onGithubLogin: () => dispatch(authLoginRequest('github')),
  onClose: () => dispatch(modalHide('login')),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalContainer)
