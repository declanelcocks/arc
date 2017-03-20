import React, { Component } from 'react'

import NotFoundPage from 'components/pages/NotFoundPage'

class NotFoundPageContainer extends Component {
  static get({ res }) {
    res.status(404)
  }

  render() {
    return <NotFoundPage {...this.props} />
  }
}

export default NotFoundPageContainer
