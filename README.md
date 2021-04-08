# Theme
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

# Local development workflow
The repository includes an example site for working on the theme. It's located in the example folder. 
The theme itself is located in the packages/@cinemataztic/gatsby-theme-cinemataztic-cms folder. 

## yarn workspaces:
Work on the example site: 
```
% yarn workspace example site develop
```
Add packages to the theme: 
```
% yarn workspace @cinemataztic/gatsby-theme-cinemataztic-cms add package-name
```

## Run CMS from Local Git Repo
NetlifyCMS usually connects to the repository (on github or bitbucket). To avoid having to push/pull changes to remote each time a file in the CMS is updated, a proxy can be used to run it locally:
```
% npx netlify-cms-proxy-server
```

## Local git netlify cms backend
https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository

# Troubleshooting
### Fix problems with paths for images
Fix problems with paths for images (type File) in graphQL gatsby-transformer-yaml: https://github.com/d4rekanguok/gatsby-schema-field-absolute-path
### Error loading the CMS configuration
```
Error loading the CMS configuration
  Config Errors:
    Error: Backend not found: local
Check your config.yml file.
```
Did you forget to run `npx netlify-cms-proxy-server`?

# Resources
 - https://egghead.io/lessons/gatsby-set-up-yarn-workspaces-for-gatsby-theme-development
 - https://github.com/jlengstorf/authoring-gatsby-themes
