/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/templates/blog-post.js');

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          next {
            frontmatter {
              title
              path
            }
          }
          previous {
            frontmatter {
              title
              path
            }
          }
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }
  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        next,
        previous,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bizcharts/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
