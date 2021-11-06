import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { SeoQuery } from '../../graphql-types'

interface Props {
  subTitle?: string
  description?: string
}

export const SEO: React.FC<Props> = ({ subTitle, description = '' }) => {
  const data: SeoQuery = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitterUsername
        }
      }
    }
  `)

  const seo = {
    title: data.site?.siteMetadata?.title,
    description: description ?? data.site?.siteMetadata?.description,
    twitterUsername: data.site?.siteMetadata?.twitterUsername || '',
  }

  return (
    <Helmet title={`${subTitle ? subTitle + ' | ' : ''}${seo.title}`}>
      <html lang="zh-CN" />

      <meta name="description" content={seo.description} />

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      <meta name="twitter:card" content="summary_large_image" />

      {seo.twitterUsername && (
        <meta name="twitter:creator" content={seo.twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
    </Helmet>
  )
}
