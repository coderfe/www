module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.coderfee.com',
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
  ],
}
