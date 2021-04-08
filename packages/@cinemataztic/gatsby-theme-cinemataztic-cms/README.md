### Local git netlify cms backend
https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository

### Fix problems with paths for images (type File) in graphQL gatsby-transformer-yaml
https://github.com/d4rekanguok/gatsby-schema-field-absolute-path

## Sitemap
We use [gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/) to generate sitemaps. To exclude paths from the sitemap, include it in the gatsby-theme-cinemataztic-cms gatsby-config: 

```
module.exports = {
  plugins: [
    {
      resolve: "@cinemataztic/gatsby-theme-cinemataztic-cms",
      options: {
        ...
        sitemap: {
          exclude: [`/example-page/*`]
        }
      }
    }
  ]
};
```