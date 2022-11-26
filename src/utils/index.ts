import type { Post } from '@/types'
import { slug } from 'github-slugger'

export const slugify = (path: string | undefined) => {
  return path ? slug(path.replaceAll('/', '-').replace(/src-content-/, '').replace('.mdx', '')) : ''
}

export const formatDate = (datetime: string) => {
  const date = new Date(datetime)
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date)
}

export const getSortedPosts = (posts: Post[]) => {
  return posts.sort((p1, p2) => new Date(p2.frontmatter.date).getTime() - new Date(p1.frontmatter.date).getTime())
}

export const getUniqueTags = (posts: Post[]) => {
  const tags = posts.map(post => post.frontmatter.tags.map(slugify))
  return [...new Set(tags.flat(1))]
}

export const getPostsByTag = (posts: Post[], tag: string) => {
  return posts.filter(post => post.frontmatter.tags.map(slugify).includes(tag))
}
