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
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://coderfee.com',
        sitemap: 'https://www.coderfee.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.jpg',
        name: 'CSpace',
        short_name: 'CSpace',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#111827',
        display: 'standalone',
        cache_busting_mode: 'none',
        icon_options: {
          purpose: 'any maskable',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icons*'],
        },
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
    'gatsby-plugin-graphql-codegen',
    {
      resolve: 'gatsby-plugin-feed',
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
            serialize: ({ query: { site, allMdx } }) => allMdx.nodes.map((node) => ({
              ...node.frontmatter,
              description: node.frontmatter.tldr,
              date: node.frontmatter.date,
              url: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
              guid: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
              custom_elements: [{ 'content:encoded': node.frontmatter.tldr }],
            })),
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
            output: '/rss.xml',
            title: 'CSpace RSS Feed',
            match: '^/blog/',
          },
        ],
      },
    },
  ],
};
