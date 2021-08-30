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

On Windows - which will run the development server using env vars from **.env.development** 
Since this is a gatsby project the site will be avilable on **http://localhost:8000**

```
% yarn workspace example staging
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

## Changes
Need:
- [X] Scrolle ned skal ikke være røde
- [ ] tekst links  
- [X] Call to action på cover video - Afspil film / går til link - ingen links i test
- [X] Vælg mellem en af de 5 brandfaver når man laver en knap
- [X] Billeder ved siden af hinanden
- [X] Flere typer knapper. Med fyld, uden fyld, farver
- [ ] Små billeder / ikoner ---- undersøg om fullwidth billedet skal ikke altid fylde det hele - eller kan vi lave max størrelse
- [X] Flere knapper på en post - lav knap component som kan tilføj X antal knapper
- [X] Max width på container / Content kort 
- [X] Headet tekst må ikke ligge på logo
- [X] Skift farve på content box
- [X] Størrelse på content box
- [ ] pile ved feature list i center ? 
- [X] man skal kunne se overskrift på Page list- vises overhovedet ikke - den lille grå pil  
- [X] Tænd eller sluk fade på cover video / foto - billedet vises med fade - video vises med fade - boolean tillad knap
- [ ] Tekster på top video - anders skriver manuel break  

Nice:
- [ ] Mellemrum mellem billeder på feature list mindre
- [ ] Mikkel`s element


# Resources
 - https://egghead.io/lessons/gatsby-set-up-yarn-workspaces-for-gatsby-theme-development
 - https://github.com/jlengstorf/authoring-gatsby-themes



config must have required property 'media_folder'
config must have required property 'media_library'
config must match a schema in anyOf
config must have required property 'backend'
config must have required property 'collections'
