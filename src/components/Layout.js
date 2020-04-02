import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import ReactBreakpoints from "react-breakpoints";

import Footer from "./footer/Footer";

import favicon from "../assets/icon/favicon.ico";
import favicon32 from "../assets/icon/favicon-32x32.png";
import favicon16 from "../assets/icon/favicon-16x16.png";
import favicon96 from "../assets/icon/favicon-96x96.png";

import msIcon144 from "../assets/icon/ms-icon-144x144.png";

import appleIcon from "../assets/icon/apple-icon.png";
import appleIcon57 from "../assets/icon/apple-icon-57x57.png";
import appleIcon60 from "../assets/icon/apple-icon-60x60.png";
import appleIcon72 from "../assets/icon/apple-icon-72x72.png";
import appleIcon76 from "../assets/icon/apple-icon-76x76.png";
import appleIcon114 from "../assets/icon/apple-icon-114x114.png";
import appleIcon120 from "../assets/icon/apple-icon-120x120.png";
import appleIcon144 from "../assets/icon/apple-icon-144x144.png";
import appleIcon152 from "../assets/icon/apple-icon-152x152.png";
import appleIcon180 from "../assets/icon/apple-icon-180x180.png";

import androidIcon36 from "../assets/icon/android-icon-36x36.png";
import androidIcon48 from "../assets/icon/android-icon-48x48.png";
import androidIcon72 from "../assets/icon/android-icon-72x72.png";
import androidIcon96 from "../assets/icon/android-icon-96x96.png";
import androidIcon144 from "../assets/icon/android-icon-144x144.png";
import androidIcon192 from "../assets/icon/android-icon-192x192.png";

import manifest from "../assets/icon/manifest.json";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const Layout = ({ meta, children }) => {
  return (
    <StaticQuery
      query={graphql`
      {
        metaYaml {
          og_image
          og_title
          og_description
        }
        generalYaml {
          pageTitle
        }
      }
    `}
      render={
        data => {
          const { title } = meta;
          const { pageTitle } = data.generalYaml || "CinemaTaztic";
          return (
            <div>
              <Helmet
                title={
                  title ? `${title} | ${pageTitle}` : pageTitle
                }
                meta={[
                  {
                    name: "description",
                    content:
                      "We work with ambitious brands to create high-impact 2nd screen games, platforms and systems that the audience love. Because what people love, matters..."
                  },
                  {
                    name: "keywords",
                    content: "cinemataztic cinema games 2nd screen"
                  },
                  { name: "og:image", content: data.metaYaml.og_image },
                  {
                    name: "og:title",
                    content:
                      meta && meta.title
                        ? `${meta.title} | CinemaTaztic`
                        : data.metaYaml.og_title
                  },
                  {
                    name: "og:description",
                    content:
                      meta && meta.description
                        ? `${meta.description} | CinemaTaztic`
                        : data.metaYaml.og_description
                  },
                  {
                    name: "og:type",
                    content: meta && meta.type ? meta.type : data.metaYaml.og_type
                  }
                ]}
                link={[
                  { rel: "icon", type: "image/png", href: `${favicon}` },
                  {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: `${favicon16}`
                  },
                  {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: `${favicon32}`
                  },
                  { rel: "shortcut icon", type: "image/png", href: `${favicon96}` },
                  { rel: "msapplication-TileColor", content: "#ffffff" },
                  { rel: "msapplication-TileImage", content: `${msIcon144}` },
                  {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: `${favicon32}`
                  },
                  { rel: "shortcut icon", type: "image/png", href: `${favicon96}` },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    href: `${appleIcon}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "57x57",
                    href: `${appleIcon57}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "60x60",
                    href: `${appleIcon60}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "72x72",
                    href: `${appleIcon72}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "76x76",
                    href: `${appleIcon76}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "114x114",
                    href: `${appleIcon114}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "120x120",
                    href: `${appleIcon120}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "144x144",
                    href: `${appleIcon144}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "152x152",
                    href: `${appleIcon152}`
                  },
                  {
                    rel: "apple-touch-icon",
                    type: "image/png",
                    sizes: "180x180",
                    href: `${appleIcon180}`
                  },
                  {
                    rel: "android-icon",
                    type: "image/png",
                    sizes: "36x36",
                    href: `${androidIcon36}`
                  },
                  {
                    rel: "android-icon",
                    type: "image/png",
                    sizes: "48x48",
                    href: `${androidIcon48}`
                  },
                  {
                    rel: "android-icon",
                    type: "image/png",
                    sizes: "72x72",
                    href: `${androidIcon72}`
                  },
                  {
                    rel: "android-icon",
                    type: "image/png",
                    sizes: "96x96",
                    href: `${androidIcon96}`
                  },
                  {
                    rel: "android-icon",
                    type: "image/png",
                    sizes: "144x144",
                    href: `${androidIcon144}`
                  },
                  {
                    rel: "android-icon",
                    type: "image/png",
                    sizes: "192x192",
                    href: `${androidIcon192}`
                  },
                  { rel: "manifest", href: `${manifest}` }
                ]}
              />
              <ReactBreakpoints breakpoints={breakpoints}>
                <div
                  className="w-100 position-relative page-template"
                  style={{ minHeight: "25rem" }}
                >
                  {children}

                  <Footer />
                </div>
              </ReactBreakpoints>
            </div>
          )
        }}
    />
  )
};

export default Layout;
