import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styles from './tags.module.css';
import Emoji from '../emoji';

export default function Tags() {
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
    name: tag,
    totalCount: totalCount[index].totalCount,
  }));

  return (
    <div className="tags">
      <h4 className="sidebar-title">
        <Emoji label="标签" emoji="🏷">
          &nbsp;tags &bull; 标签
        </Emoji>
      </h4>
      <div className={styles.tagsContent}>
        {tags.map((tag, index) => (
          <span className={styles.tag} key={index}>
            {tag.name} &bull; {tag.totalCount}
          </span>
        ))}
      </div>
    </div>
  );
}
