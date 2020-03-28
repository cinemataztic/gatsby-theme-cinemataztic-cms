module.exports = ({ contentPath = "data", settingsPath = "settings" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${contentPath}/img`,
        name: `images`
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
        path: `${contentPath}/frontpage`,
        options: {
          typeName: "Frontpage"
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
      resolve: "gatsby-theme-netlify-cms",
      options: {
        contentPath
      }
    }
  ]
});
