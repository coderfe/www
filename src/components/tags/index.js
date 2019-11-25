import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import WordCloud from '../chart/WorldCloud';
import Emoji from '../emoji';
import styles from './tags.module.css';

export default function Tags() {
  const [isChart] = useState(true);

  const data = useStaticQuery(graphql`
    query Tags {
      allMarkdownRemark {
        distinct(field: frontmatter___tags)
        group(field: frontmatter___tags) {
          totalCount
        }
      }
    }
  `);

  const { distinct: tagList, group: totalCount } = data.allMarkdownRemark;

  const tags = tagList.map((tag, index) => ({
    x: tag,
    value: totalCount[index].totalCount,
    category: tag,
  }));

  return (
    <div className="tags">
      <h4 className="sidebar-title">
        <Emoji label="标签" emoji="🏷">
          &nbsp;tags &bull; 标签
        </Emoji>
      </h4>
      {isChart ? (
        <WordCloud data={tags} width={320} height={320} />
      ) : (
        <div className={styles.tagsContent}>
          {tags.map((tag, index) => (
            <span className={styles.tag} key={index}>
              {tag.x} &bull; {tag.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
