import React from 'react';
import styles from './tags.module.css';

export default function TagList({ tags }) {
  return (
    <div className={styles.tagList}>
      {tags.map((tag, index) => (
        <div className={styles.tagListItem} key={index}>
          <div>{tag.x}</div>
          <div>{tag.value}</div>
        </div>
      ))}
    </div>
  );
}
