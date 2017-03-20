import React, { Component } from 'react'

import HomePage from 'components/pages/HomePage'

class HomePageContainer extends Component {
  render() {
    return <HomePage {...this.props} />
  }
}

export default HomePageContainer
