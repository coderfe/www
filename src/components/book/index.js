import React from "react";
import { cacheImages } from "../../helper";
import styles from "./book.module.css";

export default function Book({ book }) {
  const { title, author, img } = book;

  return (
    <div className={styles.book}>
      <div className={styles.bookCover}>
        <div className={styles.bookCoverMask}></div>
        <div className={styles.bookCoverImage}>
          <img src={cacheImages(img)} alt={title} loading="lazy" />
        </div>
        <div className={styles.bookInfo}>
          <p className={styles.bookInfoTitle}>
            {/* TODO: Fix 修正书的 URL，连接至书详情 */}
            <a
              href={`https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(
                title
              )}`}
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
