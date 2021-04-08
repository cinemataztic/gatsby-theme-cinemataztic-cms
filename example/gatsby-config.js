module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-cinemataztic-cms",
      options: {
        contentPath: "content",
        settingsPath: "settings",
        basePath: "/",
        sitePath: "example",
        isYarnWorkspace: true,
        siteUrl: "https://cms-demo.cinemataztic.com",
        sitemap: {
          exclude: [`/example-page/*`]
        },
        robotsPolicy: [{ userAgent: '*', allow: '/' }, { userAgent: '*', disallow: ['/residents/'] }]
      }
    }
  ]
};
