import { graphql, navigate } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/layout';
import styles from './blog-post.module.css';
import RelatedPosts from '../components/related-posts/RelatedPosts';

export default function BlogPostTemplate({ data, pageContext }) {
  const { markdownRemark: post } = data;
  const { next, previous, relatedPosts } = pageContext;

  const { title, tldr, date, tags } = post.frontmatter;

  const handleKeyup = useCallback(
    event => {
      if (event.keyCode === 37) {
        // <-
        if (previous) {
          toast(`⬅️ ${previous.frontmatter.title}`);
          navigate(previous.frontmatter.path);
        }
      } else if (event.keyCode === 39) {
        // ->
        if (next) {
          toast(`➡️ ${next.frontmatter.title}`);
          navigate(next.frontmatter.path);
        }
      }
    },
    [next, previous]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyup]);

  return (
    <Layout seoTitle={title} seoDescription={tldr} meta={[{ name: `keyword`, content: (tags || []).join(' ') }]}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
        }}
      >
        <div className={styles.blogPost}>
          <h1 className={styles.blogPostTitle}>{title}</h1>
          <div className="post-title_sub">
            <span>{date}</span>
            <span>{post.timeToRead}min</span>
            {tags &&
              tags.map((tag, index) => (
                <span className="sub-tag" key={index}>
                  #{tag}#
                </span>
              ))}
          </div>
          <blockquote className={styles.blogPostQuote}>{tldr}</blockquote>
          <div className={styles.blogPostContent} dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className={styles.blogPostLink}>
            <div className={styles.prev}>
              {previous && (
                <AniLink
                  cover
                  direction="left"
                  bg="var(--primary-light-color)"
                  title={previous.frontmatter.title}
                  to={previous.frontmatter.path}
                >
                  ←{previous.frontmatter.title}
                </AniLink>
              )}
            </div>
            <div className={styles.next}>
              {next && (
                <AniLink
                  cover
                  direction="right"
                  bg="var(--primary-light-color)"
                  title={next.frontmatter.title}
                  to={next.frontmatter.path}
                >
                  {next.frontmatter.title}→
                </AniLink>
              )}
            </div>
          </div>
        </div>
        <RelatedPosts posts={relatedPosts} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      tableOfContents(maxDepth: 6, pathToSlugField: "frontmatter.path")
      frontmatter {
        path
        date(formatString: "MMM DD, YYYY")
        title
        tldr
        tags
      }
      timeToRead
    }
  }
`;
