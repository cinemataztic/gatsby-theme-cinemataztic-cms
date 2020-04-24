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
        site {
          siteMetadata {
            siteUrl
          }
        }
        metaYaml {
          og_image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          og_title
          og_description
          og_type
        }
        generalYaml {
          pageTitle
          companyName
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
          const { title, description, type } = meta;
          const { pageTitle, favicon, companyName } = data.generalYaml;
          const { og_image, og_title, og_description, og_type } = data.metaYaml;
          const { siteMetadata } = data.site;
          const ogImgSrc = siteMetadata.siteUrl + get(og_image, "childImageSharp.fluid.src", null);
          const faviconSrc = get(favicon, "childImageSharp.fluid.src", null);
          return (
            <div>
              <Helmet
                title={
                  `${title ? title : pageTitle} ${companyName ? `| ${companyName}` : ''}`
                }
                meta={[
                  {
                    name: "description",
                    content: description || og_description
                  },
                  { property: "og:image", content: ogImgSrc },
                  {
                    property: "og:title",
                    content: `${title || og_title || pageTitle} ${companyName ? `| ${companyName}` : ''}`
                  },
                  {
                    property: "og:description",
                    content: description || og_description
                  },
                  {
                    property: "og:type",
                    content: type || og_type
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
