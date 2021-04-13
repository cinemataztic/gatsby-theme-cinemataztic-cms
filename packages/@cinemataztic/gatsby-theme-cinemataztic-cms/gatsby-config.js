const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${activeEnv}`
});
console.log(`Using environment config: '${activeEnv}'`);

module.exports = ({
  contentPath = "content",
  sitePath = null,
  settingsPath = "settings",
  siteUrl = "https://cms-demo.cinemataztic.com",
  sitemap = {},
  robotsPolicy = [{ userAgent: '*', allow: '/' }]
}) => {
  return {
    siteMetadata: {
      siteUrl,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-sitemap`,
        options: sitemap
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${contentPath}/media`,
          name: `media`
        }
      },
      `gatsby-schema-field-absolute-path`,
      `gatsby-plugin-svgr`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "pages",
          path: `${contentPath}/pages`
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "frontpage",
          path: `${settingsPath}/frontpage`,
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "general",
          path: `${settingsPath}/general`,
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "meta",
          path: `${settingsPath}/meta`,
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "footer",
          path: `${settingsPath}/footer`,
        }
      },
      {
        resolve: "gatsby-transformer-yaml"
      },
      {
        resolve: "gatsby-plugin-transition-link",
        options: {
          layout: require.resolve(`./src/layout/`)
        }
      },
      {
        resolve: `gatsby-plugin-sass`,
      },
      {
        resolve: `gatsby-plugin-webfonts`,
        options: {
          fonts: {
            google: [
              {
                family: "Lato",
                variants: ['400', '700', '900'],
              },
            ],
          },
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: siteUrl,
          sitemap: `${siteUrl}/sitemap.xml`,
          resolveEnv: () => process.env.GATSBY_ACTIVE_ENV,
          env: {
            development: {
              policy: [{ userAgent: '*', disallow: ['/'] }]
            },
            production: {
              policy: robotsPolicy
            }
          }
        },
      },
      {
        resolve: "gatsby-plugin-netlify-cms",
        options: {
          htmlTitle: `CMS | CinemaTaztic`,
          manualInit: false,
          enableIdentityWidget: true,
          modulePath: `${__dirname}/src/cms/config.js`,
          customizeWebpackConfig: (config, { }) => {
            const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");
            if (sitePath) {
              console.info(`Updating sitePaths: \n${contentPath} -> ${sitePath}/${contentPath}\n${settingsPath} -> ${sitePath}/${settingsPath}\n`)
              contentPath = `${sitePath}/${contentPath}`;
              settingsPath = `${sitePath}/${settingsPath}`;
            }
            config.plugins.push(
              new ReplaceInFileWebpackPlugin([
                {
                  dir: config.output.path,
                  files: ["cms.js", "cms.js.map"],
                  rules: [
                    { search: /@contentPath/g, replace: contentPath },
                    { search: /@settingsPath/g, replace: settingsPath }
                  ]
                }
              ])
            );
          }
        }
      }
    ]
  };
};
