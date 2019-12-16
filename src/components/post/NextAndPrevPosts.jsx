import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components'

const BlogPostLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media screen and (max-width: 447px) {
    flex-direction: column;
  }
  
  a,
  a {
    display: block;
    color: var(--primary-light-color);
    text-decoration: none;
    transition: var(--base-transition);
  }
  
  a:hover,
  a:hover {
    color: var(--primary-color);
    text-decoration: underline;
    transform: translateX(0);
  }
`;

const Prev = styled.div`
  margin-top: 1rem;
  text-align: left;
  a {
    transform: translateX(10px);
  }
`;

const Next = styled.div`
  text-align: right;
  margin-top: 1rem;
  a {
    transform: translateX(-10px);
  }
`;

export default function NextAndPrevPosts({ previous, next }) {
  return (
    <BlogPostLinkContainer>
      <Prev>
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
      </Prev>
      <Next>
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
      </Next>
    </BlogPostLinkContainer>
  )
}