import { graphql, Link, navigate } from 'gatsby';
import React, { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/layout';
import styles from './blog-post.module.css';

export default function BlogPostTemplate({ data, pageContext }) {
  const { markdownRemark: post } = data;
  const { next, previous } = pageContext;

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
      <div className={styles.blogPost}>
        <h1 className={styles.blogPostTitle}>{title}</h1>
        <p className="post-title_sub">
          <span>{date}</span>
          {tags &&
            tags.map((tag, index) => (
              <span className="sub-tag" key={index}>
                #{tag}#
              </span>
            ))}
        </p>
        <blockquote className={styles.blogPostQuote}>{tldr}</blockquote>
        <div className={styles.blogPostContent} dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className={styles.blogPostLink}>
          <div className={styles.prev}>
            {previous && (
              <Link title={previous.frontmatter.title} to={previous.frontmatter.path}>
                ←{previous.frontmatter.title}
              </Link>
            )}
          </div>
          <div className={styles.next}>
            {next && (
              <Link title={next.frontmatter.title} to={next.frontmatter.path}>
                {next.frontmatter.title}→
              </Link>
            )}
          </div>
        </div>
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
    }
  }
`;
