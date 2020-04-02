/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 10-09-2019.
 */
import React, { useEffect, useRef } from "react";
import { Waypoint } from "react-waypoint";
import { TweenMax } from "gsap";
import Divider from "../Divider";
import { graphql, StaticQuery } from "gatsby";
import { useHover } from "react-use-gesture";
import "./footer.scss";
import { ReactComponent as Instagram } from "../../assets/social/instagram.svg";
import { ReactComponent as Facebook } from "../../assets/social/facebook.svg";
import { ReactComponent as LinkedIn } from "../../assets/social/linkedin.svg";

const sizeToColums = size => {
  switch (size) {
    case "12.5%":
      return "col-lg-3 ";

    case "25%":
      return "col-lg-4";

    case "50%":
      return "col-lg-6";

    default:
      return "col-lg-12";
  }
};

const LinkItem = ({ link }) => {
  const lineRef = useRef();
  const itemRef = useRef();

  const bind = useHover(({ hovering }) => {
    TweenMax.to(lineRef.current, 0.5, {
      alpha: hovering ? 1 : 0,
      ease: "Expo.easeOut"
    });
    TweenMax.to(itemRef.current, 0.5, {
      alpha: hovering ? 0.7 : 1,
      ease: "Expo.easeOut"
    });
  });

  useEffect(() => {
    TweenMax.set(lineRef.current, { alpha: 0 });
    TweenMax.set(itemRef.current, { alpha: 1 });
  });

  return (
    <li
      {...bind()}
      ref={itemRef}
      className="pointer w-100 mt-2 mb-2 position-relative"
      style={{}}
    >
      <a className="body-text" href={link.url}>
        {link.title}{" "}
      </a>
      <div
        ref={lineRef}
        className="d-inline-block position-absolute ml-2"
        style={{ top: ".8rem", width: 20, height: 1, background: "white" }}
      ></div>
    </li>
  );
};

const Footer = () => {
  const maskRef = useRef();
  const contentRef = useRef();

  const onEnter = e => {
    TweenMax.to(maskRef.current, 1, {
      scaleY: 0,
      delay: 0.1,
      ease: "Expo.easeOut"
    });
    TweenMax.to(contentRef.current, 1, { y: 0, ease: "Expo.easeOut" });
  };

  const onLeave = e => {
    TweenMax.to(maskRef.current, 1, { scaleY: 1, ease: "Expo.easeOut" });
    TweenMax.to(contentRef.current, 1, { y: 200, ease: "Expo.easeOut" });
  };

  useEffect(() => {
    //TweenMax.to(item,.5, {alpha:1, ease:"Expo.easeOut"});
    TweenMax.set(maskRef.current, { scaleY: 1, transformOrigin: "100% 100%" });
    TweenMax.to(contentRef.current, { y: 200 });
  });

  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          footerYaml {
            id
            title
            headline
            footerColumn {
              columnTitle
              size
              footerItem {
                title
                url
              }
            }
            componentType
            description
          }
          metaYaml {
            linkedinLink
            instagramLink
            facebookLink
          }
        }
      `}
      render={data => {
        const {
          html,
          description,
          headline,
          footerColumn
        } = data.footerYaml;

        const { facebookLink,
          instagramLink,
          linkedinLink
        } = data.metaYaml

        const content = footerColumn;

        const columns = content.map((column, index) => {
          const links = column.footerItem.map((link, index) => {
            return <LinkItem key={index} link={link}></LinkItem>;
          });

          const padLeft = index === 0 ? "pl-md-5" : "";
          const colSize = sizeToColums(column.size);

          return (
            <div
              key={index}
              className={`${colSize} col-12 col-sm-6 pt-0 pt-md-4 pl-4  ${padLeft}`}
            >
              <h6 className="text-uppercase font-weight-bold">
                {column.columnTitle}
              </h6>
              <ul className="list-unstyled">{links}</ul>
            </div>
          );
        });

        columns.push(
          <div
            key="conta_ct"
            className={`col-12 col-md-3 pt-0 pt-md-4 justify-content-end pl-4 pr-2 `}
          >
            <div
              className="footer-markdown"
              style={{ whiteSpace: "pre-wrap", color: "white" }}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        );

        return (
          <Waypoint onEnter={onEnter} onLeave={onLeave}>
            <div className="footer row mx-auto page-component pt-5 position-relative">
              <div
                ref={contentRef}
                className="col-12 pt-5 col-md-10 w-100 mx-auto use-background fine-shadow "
              >
                <div className="row " style={{}}>
                  <div
                    ref={maskRef}
                    className="w-100 h-100 position-absolute "
                    style={{
                      zIndex: 100,
                      top: 0,
                      left: 0,
                      background: "#252525"
                    }}
                  ></div>

                  <div className="col-12 pl-4 pl-md-5  mx-auto">
                    <div className="" style={{}}>
                      <h1 className="font-weight-bold display-4 mt-3">
                        {headline}
                      </h1>
                      <Divider></Divider>

                      <div
                        className="text-body footer-markdown"
                        style={{ whiteSpace: "pre-wrap", color: "white" }}
                        dangerouslySetInnerHTML={{ __html: description }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  className="row mt-4 mb-5 justify-content-between"
                  style={{}}
                >
                  {columns}
                </div>
              </div>

              <div
                className="col-12 col-md-10 mx-auto"
                style={{ background: "black" }}
              >
                <div className="row" style={{}}>
                  <div className="col-6">
                    <div className=" pt-3 pl-4 pb-3 float">
                      <p
                        className="mb-0 font-weight-light"
                        style={{ fontSize: ".8rem", opacity: 0.5 }}
                      >
                        All rights reserved {new Date().getFullYear()} ©
                        Cinematatic{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-6">
                    <div
                      className="d-flex social float-right pt-1"
                      style={{ opacity: 0.6 }}
                    >
                      {instagramLink && (
                        <div className="pointer">
                          <a
                            href={instagramLink}
                            alt="instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram />
                          </a>
                        </div>
                      )}

                      {facebookLink && (
                        <div className="pointer">
                          <a
                            href={facebookLink}
                            alt="facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook />
                          </a>
                        </div>
                      )}

                      {linkedinLink && (
                        <div className="pointer">
                          <a
                            href={linkedinLink}
                            alt="linkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkedIn />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-100 h-50 position-absolute pt-5 "
                style={{
                  zIndex: -1,
                  bottom: 0,
                  left: 0,
                  background: "#000000"
                }}
              ></div>
            </div>
          </Waypoint>
        );
      }}
    />
  );
};
export default Footer;
