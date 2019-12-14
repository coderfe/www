import { Link } from 'gatsby';
import Emoji from '../emoji';
import React from 'react';

import styles from './nav.module.css'

export default function Nav() {
  return (
    <div className={styles.navigator}>
      <Link to="/">
        <Emoji label="首页" emoji="🏡">此地</Emoji>
      </Link>
      <Link to="/books">
        <Emoji label="书单" emoji="📚">此书</Emoji>
      </Link>
      <Link to="/year">
        <Emoji label="年终总结" emoji="📆">此年</Emoji>
      </Link>
    </div>
  )
}