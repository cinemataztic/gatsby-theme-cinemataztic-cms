/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 25-07-2019.
 */

import React from "react";
import { graphql, StaticQuery } from "gatsby";
import "./navigation.scss";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";

const Navigation = React.memo(() => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          allPagesYaml {
            edges {
              node {
                id
                title
                slug
                navigation {
                  priority
                  title
                }
              }
            }
          }
          allFooterYaml {
            edges {
              node {
                id
                title
              }
            }
          }
          metaYaml {
            linkedinLink
            instagramLink
            facebookLink
          }
          generalYaml {
            logo {
              publicURL
            }
            logoSmall {
              publicURL
            }
          }
        }
      `}
      render={data => {
        const menuData = data.allPagesYaml;
        let { logo, logoSmall } = data.generalYaml;
        if (
          logo.ext !== ".svg"
          && logo.childImageSharp
          && logo.childImageSharp.gatsbyImageData
          && logo.childImageSharp.gatsbyImageData.src
        ) {
          logo.src = logo.childImageSharp.gatsbyImageData.src
        }
        else {
          logo.src = logo.publicURL
        }

        if (
          logoSmall.ext !== ".svg"
          && logoSmall.childImageSharp
          && logoSmall.childImageSharp.gatsbyImageData
          && logoSmall.childImageSharp.gatsbyImageData.src
        ) {
          logoSmall.src = logoSmall.childImageSharp.gatsbyImageData.src
        }
        else {
          logoSmall.src = logoSmall.publicURL
        }


        return (
          <div
            className="container-fluid cine-navigation position-fixed w-100"
            style={{ top: 0, left: 0, zIndex: 200 }}
          >
            <MobileNavigation
              logo={logo}
              menuData={menuData}
              meta={data.metaYaml}
            />
            <DesktopNavigation
              logo={logo}
              logoSmall={logoSmall}
              menuData={menuData}
            />
          </div>
        );
      }}
    />
  );
});

export default Navigation;
