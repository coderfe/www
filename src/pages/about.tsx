import * as React from 'react'
import Container from '../components/layout/Container'
import { Layout } from '../components/layout/Layout'
import { A, H2, LI, UL } from '../components/provider'
import { SEO } from '../components/SEO'

const AboutPage = () => {
  return (
    <Layout>
      <SEO subTitle="about coderfee" />
      <Container className="h-screen py-5 text-gray-700 dark:text-gray-100">
        <H2>About Me</H2>
        <p>前端开发一枚，目前在职京东物流</p>

        <H2>macOS setup</H2>
        <UL>
          <LI>Visual Studio Code</LI>
          <LI>WebStorm</LI>
          <LI>iTerm2</LI>
        </UL>

        <H2>Windows setup</H2>
        <UL>
          <LI>Visual Studio Code</LI>
          <LI>WebStorm</LI>
          <LI>Windows Terminal & Oh My Posh</LI>
        </UL>

        <H2>Projects</H2>
        <UL>
          <LI>
            <A href="https://marketplace.visualstudio.com/publishers/coderfee">
              VSCode 插件集
            </A>
          </LI>
          <LI>
            <A href="https://coderfee.com" target="__blank">
              CSpace
            </A>
            ——个人网站
          </LI>
          <LI>
            <A href="https://github.com/coderfe/db-book" target="__blank">
              db-book
            </A>
            ——爬取豆瓣读书标记过的书
          </LI>
        </UL>

        <H2>Links</H2>
        <UL>
          <LI>
            <A href="https://github.com/coderfe" target="__blank">
              GitHub
            </A>
          </LI>
          <LI>
            <A href="https://twitter.com/coderfee" target="__blank">
              Twitter
            </A>
          </LI>
        </UL>
      </Container>
    </Layout>
  )
}

export default AboutPage
