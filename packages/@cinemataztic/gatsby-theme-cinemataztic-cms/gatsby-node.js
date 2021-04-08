const fs = require("fs-extra");
const path = require("path");
const mkdirp = require("mkdirp");
const { getTypeDefs } = require("./type-defs.js");

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {

  // Check if this is run from a yarn workpace
  // If yes: copy hoisted bootstrap package from ../node_modules to target workspace node_modules.
  // Assuming options.isYarnWorkspace = true and options.sitePath = example:
  // - cinemataztic-gatsby-cms
  //   - gatsby-theme-cinemataztic-cms
  //     - node_modules
  //       - bootstrap <-- copy from here
  //   - site
  //     - node_modules
  //       - bootstrap <-- to here
  //
  // EXAMPLE: 
  // boostrap sass imports does not work when boostrap npm package has been hoisted to ../node_modules 
  // (e.g.  @import "node_modules/bootstrap/scss/mixins" in gatsby-theme-cinemataztic-cms/src/components/navigation/navigation.scss)
  //

  if (options.isYarnWorkspace && options.sitePath) {
    let themePathPrefix = "../../..";
    reporter.info(`running as yarn workspace`);
    let hoistedPath = path.resolve(__dirname, "../../../node_modules/bootstrap");
    if (!fs.existsSync(path.resolve(__dirname, "../node_modules/bootstrap")) && fs.existsSync(path.resolve(__dirname, "../../../../node_modules/bootstrap"))) {
      themePathPrefix = "../.."
      hoistedPath = path.resolve(__dirname, `${themePathPrefix}/node_modules/bootstrap`);
    }
    const workspacePath = path.resolve(__dirname, `${themePathPrefix}/${options.sitePath}/node_modules/bootstrap`);
    if (!fs.existsSync(workspacePath)) {
      reporter.info(`copying hoisted bootstrap package from ${hoistedPath} to ${workspacePath}`)
      fs.copySync(
        hoistedPath,
        workspacePath)
    }
  }

  // Create content directories if they don't exist
  const contentPath = options.contentPath || "content";
  const pagesPath = `${contentPath}/pages`;

  if (!fs.existsSync(pagesPath)) {
    reporter.info(`creating the ${pagesPath} directory and populating with default pages.`);
    mkdirp.sync(pagesPath);
    fs.copySync(
      `${__dirname}/defaults/content/pages`,
      pagesPath);
  }

  const mediaPath = `${contentPath}/media`;
  if (!fs.existsSync(mediaPath)) {
    reporter.info(`creating the ${mediaPath} directory and populating with default media content`);
    mkdirp.sync(mediaPath);
    fs.copySync(
      `${__dirname}/defaults/content/media`,
      mediaPath)
  }

  // Check if required settings folder and files exist
  const settingsPath = options.settingsPath || `settings`;

  const requiredPaths = [
    {
      dir: `${settingsPath}/frontpage`,
      fileName: "index.yml"
    },
    {
      dir: `${settingsPath}/general`,
      fileName: "index.yml"
    },
    {
      dir: `${settingsPath}/footer`,
      fileName: "index.yml"
    },
    {
      dir: `${settingsPath}/meta`,
      fileName: "index.yml"
    },
    {
      dir: `${settingsPath}/frontpage`,
      fileName: "index.yml"
    }
  ]

  requiredPaths.forEach(path => {
    if (!fs.existsSync(path.dir)) {
      reporter.info(`creating the ${path.dir} directory`);
      mkdirp.sync(path.dir);
    }
    if (path.fileName && !fs.existsSync(`${path.dir}/${path.fileName}`)) {
      fs.copyFile(
        `${__dirname}/defaults/${path.dir}/${path.fileName}`,
        `${path.dir}/${path.fileName}`,
        err => {
          if (err) throw err;
          reporter.info(`${path.dir}/${path.fileName} not found - created default.`);
        }
      );
    }
  });
};

// 2. define the event type
exports.createSchemaCustomization = ({ actions }, options) => {
  const { createTypes } = actions;
  createTypes(getTypeDefs(options.contentPath));
};

// 3 define resolvers for any custom fields (slug)
exports.createResolvers = async ({ createResolvers }, options) => {
  const basePath = options.basePath || "/";

  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    return `${basePath}${slug}`.replace(/\/\/+/g, "/");
  };

  const getParentPageYaml = async function (context, parentPageUuid) {
    const parentPageYaml = await context.nodeModel.runQuery({
      type: `PagesYaml`,
      firstOnly: true,
      query: { filter: { uuid: { eq: parentPageUuid } } }
    });
    return parentPageYaml;
  };

  createResolvers({
    PagesYaml: {
      slug: {
        type: "String",
        resolve: async (source, args, context, info) => {
          let slug = slugify(source.title);
          if (source.parentPage) {
            const parentPageYaml = await getParentPageYaml(
              context,
              source.parentPage
            );
            slug = slugify(parentPageYaml.title) + slugify(source.title);
          }
          return slug;
        }
      }
    }
  });
};

// 4. query for pages and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || "/";

  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/frontpage.js")
  });

  const allPages = await graphql(`
    query {
      allPagesYaml(sort: { fields: title, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (allPages.errors) {
    reporter.panic("error loading pages", reporter.errors);
    return;
  }

  const pages = allPages.data.allPagesYaml.nodes;
  pages.forEach(async page => {
    const { slug } = page;
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/page.js"),
      context: {
        pageID: page.id
      }
    });
  });
};
