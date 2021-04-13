// src/gatsby-theme-netlify-cms/config.js

import CMS, { init } from "netlify-cms-app";
import uploadcare from 'netlify-cms-media-library-uploadcare';

// Import custom widgets
import AutoUuidWidgetControl from "./AutoUuidWidget/AutoUuidWidgetControl";

import cinematazticLogo from "./cinemataztic_logo_300x150.png";

import settings from "./collections/settings";
import pages from "./collections/pages";

// Register preview templates
CMS.registerWidget("uuid", AutoUuidWidgetControl);

const {
  GATSBY_LOCAL_BACKEND,
  GATSBY_NETLIFY_SITE_DOMAIN,
  GATSBY_BACKEND_NAME,
  GATSBY_BACKEND_REPO,
  GATSBY_BACKEND_BRANCH,
  UPLOADCARE_PUBLIC_KEY
} = process.env;

let config = {
  local_backend: GATSBY_LOCAL_BACKEND === "true",
  backend: {
    name: GATSBY_LOCAL_BACKEND === "true" ? "local" : GATSBY_BACKEND_NAME,
    repo: GATSBY_LOCAL_BACKEND === "true" ? "" : GATSBY_BACKEND_REPO,
    branch: GATSBY_BACKEND_BRANCH
  },
  logo_url: cinematazticLogo,
  media_folder: "@contentPath/media",
  public_folder: "/",
  collections: [pages, settings]
};

if (GATSBY_NETLIFY_SITE_DOMAIN) {
  config.backend.site_domain = GATSBY_NETLIFY_SITE_DOMAIN;
}

if (UPLOADCARE_PUBLIC_KEY) {
  CMS.registerMediaLibrary(uploadcare);
  config.media_library = {
    name: "uploadcare",
    config: {
      publicKey: UPLOADCARE_PUBLIC_KEY
    }
  }
}

init({ config });
