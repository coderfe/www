import { graphql, Link } from 'gatsby';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Profile from '../components/profile';
import SEO from '../components/seo';
import Tags from '../components/tags';

const IndexPage = ({ data }) => {
  const { edges: allPosts } = data.allMarkdownRemark;
  const chunkedPosts = chunk(allPosts);

  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(chunkedPosts[page]);

  useEffect(() => {
    let observer;
    if (IntersectionObserver) {
      const target = document.querySelector('.footer');
      if (target) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const nextPage = Number(target.dataset.page) + 1;
                setPage(nextPage);
                if (nextPage < chunkedPosts.length) {
                  setPosts(prevPosts => {
                    return [...prevPosts, ...chunkedPosts[nextPage]];
                  });
                }
                observer.unobserve(target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '10px',
          }
        );
        observer.observe(target);
        target.setAttribute('data-page', page);
      }
    }
  });

  return (
    <Layout>
      <SEO
        title="首页"
        description="coderfee coderfee.com coderfe 前端 Gatsby"
      />
      <div className="home">
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

function chunk(arr, size = 6) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, k) =>
    arr.slice(k * size, k * size + size)
  );
}
