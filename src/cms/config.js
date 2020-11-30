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

const GATSBY_LOCAL_BACKEND = process.env.GATSBY_LOCAL_BACKEND;
const GATSBY_BACKEND_NAME = process.env.GATSBY_BACKEND_NAME;
const GATSBY_BACKEND_REPO = process.env.GATSBY_BACKEND_REPO;
const GATSBY_BACKEND_BRANCH = process.env.GATSBY_BACKEND_BRANCH;
const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY;

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

if (UPLOADCARE_PUBLIC_KEY) {
  CMS.registerMediaLibrary(uploadcare);
  config.media_library = {
    name: uploadcare,
    config: {
      publicKey: UPLOADCARE_PUBLIC_KEY
    }
  }
}

init({ config });
