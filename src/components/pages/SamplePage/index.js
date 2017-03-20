import React from 'react'
import Helmet from 'react-helmet'

import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import PageTemplate from 'components/templates/PageTemplate'
import PostForm from 'containers/PostForm'
import PostList from 'containers/PostList'

const SamplePage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <Helmet title="Sample Page" />
      <PostForm />
      <PostList limit={15} />
    </PageTemplate>
  )
}

export default SamplePage
