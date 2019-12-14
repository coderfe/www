import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Emoji from '../emoji';
import React from 'react';

import styles from './nav.module.css';

export default function Nav() {
  return (
    <div className={styles.navigator}>
      <AniLink paintDrip hex="#af877c" duration={1} to="/">
        <Emoji label="首页" emoji="🏡">
          此地
        </Emoji>
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/books">
        <Emoji label="书单" emoji="📚">
          此书
        </Emoji>
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/year">
        <Emoji label="年终总结" emoji="📆">
          此年
        </Emoji>
      </AniLink>
    </div>
  );
}
