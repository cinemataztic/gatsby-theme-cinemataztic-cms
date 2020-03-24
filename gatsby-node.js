const fs = require("fs");
const mkdirp = require("mkdirp");
const { typeDefs } = require("./type-defs.js");

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "content";
  const pagesPath = `${contentPath}/pages`;
  if (!fs.existsSync(pagesPath)) {
    reporter.info(`creating the ${pagesPath} directory`);
    mkdirp.sync(pagesPath);
  }
  const settingsPath = `${contentPath}/settings`;
  if (!fs.existsSync(settingsPath)) {
    reporter.info(`creating the ${settingsPath} directory`);
    mkdirp.sync(settingsPath);
  }
};

// 2. define the event type
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(typeDefs);
};

// 3 define resolvers for any custom fields (slug)
exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || "/";

  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/");
  };

  createResolvers({
    PagesYaml: {
      slug: {
        resolve: source => slugify(source.title)
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

  const result = await graphql(`
    query {
      allPagesYaml(sort: { fields: title, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("error loading pages", reporter.errors);
    return;
  }

  const pages = result.data.allPagesYaml.nodes;

  console.log("result.data: ", JSON.stringify(result.data));

  pages.forEach(page => {
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
