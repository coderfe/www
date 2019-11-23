import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import styles from './blog-post.module.css';

export default function BlogPostTemplate({ data }) {
  const { markdownRemark: post } = data;

  const { title, tldr, date, tags } = post.frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={tldr}>
      <Helmet title={title} />
      <div className={styles.blogPostWrapper}>
        <div className={styles.blogPostAside}>
          <blockquote className={styles.blogPostQuote}>{tldr}</blockquote>
        </div>
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
          <div
            className={styles.blogPostContent}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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
