import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import WordCloud from '../chart/WorldCloud';
import Emoji from '../emoji';
import styles from './tags.module.css';
import TagList from './TagList';

export default function Tags() {
  const [isChart] = useState(false);

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

  const tags = tagList
    .map((tag, index) => ({
      x: tag,
      value: totalCount[index].totalCount,
      category: tag,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="tags">
      <h4 className="sidebar-title">
        <Emoji label="标签" emoji="🏷">
          &nbsp;tags &bull; 标签
        </Emoji>
      </h4>
      {isChart && process.browser ? (
        <WordCloud data={tags} width={320} height={320} />
      ) : (
        <div className={styles.tagsContent}>
          <TagList tags={tags} />
        </div>
      )}
    </div>
  );
}
