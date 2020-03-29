// src/gatsby-theme-netlify-cms/config.js

import CMS, { init } from "netlify-cms-app";

// Import custom widgets
import AutoUuidWidgetControl from "./AutoUuidWidget/AutoUuidWidgetControl";

import cinematazticLogo from "./cinemataztic_logo_300x150.png";

import frontPage from "./collections/frontpage";
import pages from "./collections/pages";

// Register preview templates
CMS.registerWidget("uuid", AutoUuidWidgetControl);

init({
  config: {
    local_backend: true,
    backend: {
      name: "git-gateway"
    },
    logo_url: cinematazticLogo,
    media_folder: "@contentPath/media",
    public_folder: "/",
    collections: [frontPage, pages]
  }
});
