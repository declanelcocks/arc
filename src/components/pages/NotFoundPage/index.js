import React from 'react'

import Heading from 'components/atoms/Heading'
import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import PageTemplate from 'components/templates/PageTemplate'

const NotFoundPage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <Heading>404 Not Found</Heading>
    </PageTemplate>
  )
}

export default NotFoundPage
