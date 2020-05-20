module.exports = {
  siteMetadata: {
    title: 'JH',
    description: 'Welcome',
    author: '@jhukdev',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#222',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/jhuk-icon.png',
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@': 'src/',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: ['src/styles'],
      },
    },
    'gatsby-plugin-preact',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      // This must be *last* in the array
      resolve: 'gatsby-plugin-no-javascript',
      options: {
        excludePaths: void 0,
      },
    },
  ],
};
