import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import SEO from './seo';
import Profile from './profile';

toast.configure({ autoClose: 2000 });

const Layout = ({ seoTitle, seoDescription, meta, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          ICP
        }
      }
    }
  `);
  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const pageTitle = seoTitle ? seoTitle : siteTitle;
  const pageDescription = seoDescription ? seoDescription : siteDescription;

  return (
    <>
      <SEO
        lang="zh-cmn-Hans"
        title={pageTitle}
        description={pageDescription}
        meta={meta || []}
      />
      <div className="layout">
        <aside className="aside">
          <div className="aside-effect"/>
          <div className="aside-content">
            <Profile />
          </div>
        </aside>
        <main>
          {children}
          <footer className="footer">
            © {new Date().getFullYear()},{` `}
            <a
              href="http://www.beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.site.siteMetadata.ICP}
            </a>
          </footer>
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
};

export default Layout;
