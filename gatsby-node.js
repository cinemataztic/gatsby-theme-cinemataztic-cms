const fs = require("fs");
const mkdirp = require("mkdirp");
const { getTypeDefs } = require("./type-defs.js");

/* console.log("typeDefs: ", getTypeDefs(contentPath)); */

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  // Create content directory if they don't exist
  const contentPath = options.contentPath || "content";
  const pagesPath = `${contentPath}/pages`;
  if (!fs.existsSync(pagesPath)) {
    reporter.info(`creating the ${pagesPath} directory`);
    mkdirp.sync(pagesPath);
  }
  const imgPath = `${contentPath}/img`;
  if (!fs.existsSync(imgPath)) {
    reporter.info(`creating the ${imgPath} directory`);
    mkdirp.sync(imgPath);
  }

  const settingsPath = `${contentPath}/settings`;
  if (!fs.existsSync(settingsPath)) {
    reporter.info(`creating the ${settingsPath} directory`);
    mkdirp.sync(settingsPath);
  }
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

    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/");
  };

  const getParentPageYaml = async function(context, parentPageUuid) {
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
