import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components'
import Emoji from '../emoji';

const NavigatorContainer = styled.div`
  text-align: center;
  font-family: Serif, serif;
  font-weight: bold;
  
  a {
    display: block;
    color: white;
    transition: all 0.2s linear;
  }
  
  a + a {
    margin-top: 1rem;
  }
  
  a:hover,
  a[aria-current=page] {
    font-weight: 900;
    transform: scale(1.2);
  }
`;

export default function Navigator() {
  return (
    <NavigatorContainer>
      <AniLink paintDrip hex="#af877c" duration={1} to="/">
        <Emoji label="首页" emoji="🏡">
          此间
        </Emoji>
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/books">
        <Emoji label="书单" emoji="📚">
          此书
        </Emoji>
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/about">
        <Emoji label="关于我" emoji="👨‍💻‍">
          此人
        </Emoji>
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/year">
        <Emoji label="年终总结" emoji="📆">
          此年
        </Emoji>
      </AniLink>
    </NavigatorContainer>
  );
}
