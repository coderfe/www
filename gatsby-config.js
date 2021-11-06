module.exports = {
  siteMetadata: {
    siteUrl: 'https://coderfee.com',
    description: 'Read Think Code',
    title: 'coderfee space',
    twitterUsername: 'coderfee',
    author: 'coderfee',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.jpg',
        name: `coderfee space`,
        short_name: `CSpace`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#1f2937`,
        display: `standalone`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './src/posts/',
      },
      __key: 'posts',
    },
    `gatsby-plugin-graphql-codegen`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.tldr,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + '/blog/' + node.slug,
                  guid: site.siteMetadata.siteUrl + '/blog/' + node.slug,
                  custom_elements: [{ "content:encoded": node.frontmatter.tldr }],
                })
              })
            },
            query: `
              {
                allMdx(sort: {order: DESC, fields: frontmatter___date}) {
                  nodes {
                    frontmatter {
                      date
                      path
                      tags
                      title
                      tldr
                    }
                    slug
                  }
                }
                site {
                  siteMetadata {
                    siteUrl
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "CSpace RSS Feed",
            match: "^/blog/",
          },
        ],
      },
    },
  ],
}
