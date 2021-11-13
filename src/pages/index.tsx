import { IconContext } from '@react-icons/all-files'
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft'
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight'
import { graphql, Link, PageProps } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { useSessionStorage } from 'react-use'
import { IndexPageQuery } from '../../graphql-types'
import Container from '../components/layout/Container'
import { Layout } from '../components/layout/Layout'
import Pagination from '../components/Pagination'
import { SEO } from '../components/SEO'

type Nodes = IndexPageQuery['allMdx']['nodes']

const IndexPage: React.FC<PageProps<IndexPageQuery>> = ({
  data: {
    allMdx: { nodes },
  },
}) => {
  const paged = chunk(nodes, 8)
  const [currentIndex, setCurrentIndex] = useSessionStorage('currentIndex', 0)
  const [articles, setArticles] = useState<Nodes>([])
  const handlePageChange = (index: number) => {
    setCurrentIndex(index)
    setArticles(paged[index])
  }

  useEffect(() => {
    setArticles(paged[currentIndex])
  }, [])

  return (
    <Layout>
      <SEO description="coderfee, coderfe" />
      <Container className="grid gap-8 py-5">
        {articles.map((node) => (
          <article key={node.id} className="grid gap-1">
            <p className="text-xs text-gray-400 dark:text-gray-300">
              {node.frontmatter?.date}
            </p>
            <h2 className="text-lg">
              <Link
                className="text-gray-700 font-semibold hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-50"
                to={`/blog/${node.slug}`}
              >
                {node.frontmatter?.title}
              </Link>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 dark:text-opacity-80">
              {node?.frontmatter?.tldr}
            </p>
          </article>
        ))}
      </Container>

      <Pagination
        page={currentIndex}
        totalPage={paged.length}
        onPageChange={handlePageChange}
      />
    </Layout>
  )
}
export default IndexPage

export const query = graphql`
  query IndexPage {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(difference: "", formatString: "MMM DD, Y")
          tags
          title
          tldr
        }
        slug
        id
      }
    }
  }
`

function chunk<T>(arr: T[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
}
