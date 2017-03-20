import React from 'react'

import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import Hero from 'components/organisms/Hero'
import FeatureList from 'components/organisms/FeatureList'
import PageTemplate from 'components/templates/PageTemplate'

const HomePage = () => {
  return (
    <PageTemplate header={<Header />} hero={<Hero />} footer={<Footer />}>
      <FeatureList />
    </PageTemplate>
  )
}

export default HomePage
