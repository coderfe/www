import * as React from 'react'
import Container from '../components/layout/Container'
import { Layout } from '../components/layout/Layout'
import { SEO } from '../components/SEO'

const AboutPage = () => {
  return (
    <Layout>
      <SEO />
      <Container className="h-full grid gap-8 py-5">
        <h2>About Me</h2>
      </Container>
    </Layout>
  )
}

export default AboutPage
