module.exports = {
  siteMetadata: {
    title: `c:/d/d`,
    description: `coderfee.com`,
    author: `coderfee`,
    ICP: '京 ICP 备 19050952 号',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/coderfe',
        icon: '😻',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/coderfee',
        icon: '🐤',
      },
      {
        name: 'RSS',
        url: 'https://coderfee.com/feed',
        icon: '🔗',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `c:/d/d`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `tomato`,
        display: `minimal-ui`,
        icon: `src/images/icon.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
