import type { Post } from '@/types'
import { slugify } from '@/utils'
import rss from '@astrojs/rss'

const postImportResult = import.meta.glob<Post>('../content/**/*.mdx', { eager: true })
const posts = Object.values(postImportResult)

export const get = () => rss({
  title: import.meta.env.SITE_NAME,
  description: import.meta.env.SITE_DESCRIPTION,
  site: import.meta.env.SITE,
  stylesheet: '/rss/style.xsl',
  items: posts.map(({ url, frontmatter: { title, date, tldr } }) => ({
    link: `/posts/${slugify(url)}`,
    description: tldr,
    title: title,
    pubDate: new Date(date),
  })),
})
