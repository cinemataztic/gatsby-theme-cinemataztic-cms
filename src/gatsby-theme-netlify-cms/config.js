// src/gatsby-theme-netlify-cms/config.js

import { createConfig, registerWidget } from "gatsby-theme-netlify-cms";

// Import custom widgets
import AutoUuidWidgetControl from "./AutoUuidWidget/AutoUuidWidgetControl";

import cinematazticLogo from "./cinemataztic_logo_300x150.png";

import frontPage from "./collections/frontpage";
import pages from "./collections/pages";

// Register preview templates
registerWidget("uuid", AutoUuidWidgetControl);

/* NetlifyCmsApp.registerWidget("uuid", AutoUuidWidgetControl); */

const config = createConfig({
  local_backend: true,
  backend: {
    name: "git-gateway"
  },
  logo_url: cinematazticLogo,
  collections: [frontPage, pages]
});

export default config;
