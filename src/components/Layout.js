import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import ReactBreakpoints from "react-breakpoints";
import get from "lodash.get";

import Footer from "./footer/Footer";

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
          favicon {
            childImageSharp {
              fluid(quality: 70, maxWidth: 32) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }           
          }
        }
      }
    `}
      render={
        data => {
          const { title } = meta;
          const { pageTitle, favicon } = data.generalYaml;
          console.log("Layout -> favicon", favicon);
          const faviconSrc = get(favicon, "childImageSharp.fluid.src", null);
          console.log("Layout -> faviconSrc", faviconSrc);
          return (
            <div>
              <Helmet
                title={
                  title ? `${title} | ${pageTitle || "CinemaTaztic"}` : pageTitle || "CinemaTaztic"
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
                  { rel: "icon", type: "image/png", href: `${faviconSrc}`, sizes: "32x32" }
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
