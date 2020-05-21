/* -----------------------------------
 *
 * Constants
 *
 * -------------------------------- */

const PRODUCTION = process.env.NODE_ENV === 'production';

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

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
        name: 'James Hill',
        short_name: 'jhukdev',
        start_url: '/',
        background_color: '#222',
        theme_color: '#00a78e',
        display: 'minimal-ui',
        icon: 'src/images/jhuk-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/'],
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
    ...(PRODUCTION ? ['gatsby-plugin-preact'] : []),
    {
      // This must be *last* in the array
      resolve: 'gatsby-plugin-no-javascript',
      options: {
        excludePaths: '/',
      },
    },
  ],
};
