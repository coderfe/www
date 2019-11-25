import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Divider from '../divider';
import Emoji from '../emoji';
import styles from './profile.module.css';

export default function Profile() {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            icon
            name
            url
          }
        }
      }
    }
  `);

  const { social } = data.site.siteMetadata;

  return (
    <div className="profile">
      <h4 className="sidebar-title">
        <Emoji label="关于我" emoji="👨‍💻">
          &nbsp;about me &bull; 关于我
        </Emoji>
      </h4>
      <div className={styles.profile}>
        <div className={styles.profileAvatar}></div>

        <div className={styles.profileSlogan}>
          愿我如星君如月，夜夜流光相皎洁。
        </div>

        <Divider width="40%" />

        <div className={styles.profileSocial}>
          {social &&
            social.map((item, index) => (
              <a
                key={index}
                title={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Emoji label={item.name} emoji={item.icon} />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
