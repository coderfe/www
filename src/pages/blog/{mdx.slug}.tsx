import { MDXProvider } from '@mdx-js/react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'
import { BlogPostQuery } from '../../../graphql-types'
import Container from '../../components/layout/Container'
import { Layout } from '../../components/layout/Layout'
import { components } from '../../components/provider'
import { SEO } from '../../components/SEO'
// @ts-ignore
import Avatar from '../../images/icon.jpg'

const Divider = () => <span className="text-gray-500">/</span>

const BlogPost: React.FC<PageProps<BlogPostQuery>> = ({
  data: { mdx, site },
}) => {
  return mdx ? (
    <Layout>
      <SEO
        subTitle={mdx.frontmatter?.title}
        description={mdx.frontmatter?.tldr || ''}
      />
      <Container>
        <article className="py-5 text-gray-700 dark:text-gray-100 dark:text-opacity-80">
          <h1 className="text-2xl font-semibold mb-2 dark:text-white dark:text-opacity-80">
            {mdx.frontmatter?.title}
          </h1>
          <p className="text-sm text-gray-600 space-x-2 mb-5 dark:text-gray-300">
            <span>
              <img
                className="inline-block w-5 h-5 rounded-full mr-1"
                src={Avatar}
              />
              {site?.siteMetadata?.author}
            </span>
            <Divider />
            <span>{mdx.frontmatter?.date}</span>
            <Divider />
            <span className="space-x-1">
              {mdx.frontmatter?.tags &&
                mdx.frontmatter?.tags.map((tag) => (
                  <span key={tag}>
                    <i className="not-italic">#</i>
                    {tag}
                    <i className="not-italic">#</i>
                  </span>
                ))}
            </span>
          </p>
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </article>
      </Container>
    </Layout>
  ) : null
}

export default BlogPost

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(difference: "", formatString: "MMM DD, Y")
        tags
        title
        tldr
      }
      body
    }
    site {
      siteMetadata {
        description
        siteUrl
        title
        author
      }
    }
  }
`
