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
  siteUrl = "https://cms-demo.cinemataztic.com"
}) => {
  return {
    siteMetadata: {
      siteUrl,
    },
    plugins: [
      `gatsby-plugin-sitemap`,
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
          path: `${settingsPath}/frontpage`,
          options: {
            typeName: "Frontpage"
          }
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${settingsPath}/general`,
          options: {
            typeName: "General"
          }
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${settingsPath}/meta`,
          options: {
            typeName: "Meta"
          }
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${settingsPath}/footer`,
          options: {
            typeName: "Footer"
          }
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
        options: {
          precision: 8
        }
      },
      {
        resolve: `gatsby-plugin-prefetch-google-fonts`,
        options: {
          fonts: [
            {
              family: `Lato`,
              variants: ["400", "700", "900"]
            }
          ]
        }
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: siteUrl,
          sitemap: `${siteUrl}/sitemap.xml`,
          resolveEnv: () => process.env.GATSBY_ENV,
          env: {
            development: {
              policy: [{ userAgent: '*', disallow: ['/'] }]
            },
            production: {
              policy: [{ userAgent: '*', allow: '/' }]
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
