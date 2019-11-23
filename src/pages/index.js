import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Profile from '../components/profile';
import Tags from '../components/tags';

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="首页" description="coderfee coderfee.com coderfe" />
      <div className="home">
        <div className="home-content">
          {posts.map(({ node: post }) => (
            <article className="post" key={post.id}>
              <h2 className="post-title">
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h2>
              <p className="post-title_sub">
                <span>{post.frontmatter.date}</span>
                {post.frontmatter.tags &&
                  post.frontmatter.tags.map((tag, index) => (
                    <span className="sub-tag" key={index}>
                      #{tag}#
                    </span>
                  ))}
              </p>
              <blockquote>{post.frontmatter.tldr}</blockquote>
            </article>
          ))}
        </div>
        <div className="home-sidebar">
          <Profile />
          <Tags />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query markdownRemark {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            path
            title
            tldr
            tags
          }
        }
      }
    }
  }
`;
