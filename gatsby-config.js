module.exports = {
  siteMetadata: {
    title: `Snail in the Mail`,
    description: `Get a snail in the snail mail from Snail in the Mail.`,
    author: `@bluegreenwebdev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.API_URL || 'http://localhost:1337',
        contentTypes: ["category", "product"],
        queryLimit: 1000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-snipcart`,
      options: {
        apiKey: "Njc2N2I0NjEtMmNhMy00ZmE3LWFjNmQtOGY3NTJkZGM2MzZiNjM3NDYxNzA4NDU5MzA2NzEz",
        autopop: true,
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
