import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const RelatedPostsContainer = styled.div`
  padding: 2rem;
  text-align: left;
  font-family: Serif, serif;

  a {
    position: relative;
    display: block;
    padding: 12px 3px;
    text-decoration: none;
    color: var(--primary-light-color);
    transition: var(--base-transition);
  }
  a::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 2px;
    width: 1px;
    height: 100%;
    background: var(--primary-light-color);
  }
  a:hover {
    color: var(--primary-color);
  }
  a:hover::before {
    background-color: var(--primary-color);
  }
`;

const Title = styled.div`
  padding-left: 3px;
  color: var(--primary-light-color);
  border-bottom: 1px solid var(--primary-light-color);
`;

export default function relatedPosts({ posts }) {
  return posts.length > 0 ? (
    <RelatedPostsContainer>
      <Title>相关阅读</Title>
      <div style={{ writingMode: 'vertical-rl', marginLeft: '-2px' }}>
        {posts.map(post => {
          return (
            <Link to={post.node.frontmatter.path} key={post.node.frontmatter.path}>
              {post.node.frontmatter.title}
            </Link>
          );
        })}
      </div>
    </RelatedPostsContainer>
  ) : null;
}
