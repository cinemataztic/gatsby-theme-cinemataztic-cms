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
        }
      `}
      render={data => {
        const menuData = data.allPagesYaml;
        return (
          <div
            className="container-fluid cine-navigation position-fixed w-100"
            style={{ top: 0, left: 0, zIndex: 200 }}
          >
            <MobileNavigation
              menuData={menuData}
              meta={data.metaYaml}
            />
            <DesktopNavigation menuData={menuData}></DesktopNavigation>
          </div>
        );
      }}
    />
  );
});

export default Navigation;
