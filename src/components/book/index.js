import React from 'react';
import { cacheImages } from '../../helper';
import styles from './book.module.css';

export default function Book({ book }) {
  const { title, author, img, url } = book;

  return (
    <div className={styles.book}>
      <div className={styles.bookCover}>
        <div className={styles.bookCoverMask}></div>
        <div className={styles.bookCoverImage}>
          <img src={cacheImages(img)} alt={title} loading="lazy" />
        </div>
        <div className={styles.bookInfo}>
          <p className={styles.bookInfoTitle}>
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank"
              className={styles.bookInfoLink}
            >
              {title}
            </a>
          </p>
          <p className={styles.bookInfoAuthor}>——{author}</p>
        </div>
      </div>
    </div>
  );
}
