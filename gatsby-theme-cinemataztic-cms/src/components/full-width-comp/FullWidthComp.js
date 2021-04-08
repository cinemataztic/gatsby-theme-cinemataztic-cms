/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 19-08-2019.
 */

import React, { useEffect, useRef } from "react";
import Divider from "../Divider";
import { Waypoint } from "react-waypoint";
import { TweenMax } from "gsap";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import Button from "../buttons/Button";
import ExternalLink from "../buttons/ExternalLink";

const sizeToColums = size => {
  // handle revers when image is switched
  switch (size) {
    case "33%":
      return "col-lg-4 ";

    case "50%":
      return "col-lg-6";

    case "66%":
      return "col-lg-8";

    case "83%":
      return "col-lg-10";
    default:
      return "col-lg-12";
  }
};

const FullWidthComp = props => {
  const myElement = useRef();
  const { fullWidthImage, title, text, size, pageLink, textAlign } = props.data;
  const image = fullWidthImage;

  const hasLink = pageLink && pageLink.page ? true : false;
  const hasExternalLink =
    pageLink && pageLink.externalLink && pageLink.externalLink !== ""
      ? true
      : false;
  const textWidth = sizeToColums(size);

  const hasTextAlign = textAlign === "center" ? "text-center" : "";
  const adjustCenterText = hasTextAlign ? "body-text-container mx-auto" : "";
  const showDivider =
    (!text && !title) || hasTextAlign === "text-center" ? false : true;

  useEffect(() => {
    TweenMax.set(myElement.current, { alpha: 0, y: 200 });
  }, []);

  const onEnter = value => {
    if (value.currentPosition === "inside") {
      TweenMax.to(myElement.current, 1.2, {
        alpha: 1,
        y: 0,
        delay: 0.2,
        ease: "Expo.easeOut"
      });
      return;
    }
    TweenMax.fromTo(
      myElement.current,
      1.2,
      { alpha: 0, y: 100, delay: 0.2, ease: "Expo.easeOut" },
      { alpha: 1, y: 0, delay: 0.2, ease: "Expo.easeOut" }
    );
  };

  const onLeave = () => {
    TweenMax.to(myElement.current, 0.5, {
      alpha: 0,
      y: 0,
      ease: "Expo.easeOut"
    });
  };

  return (
    <Waypoint onEnter={onEnter} onLeave={onLeave}>
      <div
        ref={myElement}
        className="row page-component full-width-comp mb-5 pb-5 mt-5"
        style={{ opacity: 0 }}
      >
        <div className="col-12 col-md-10 mx-auto">
          <div className="row" style={{}}>
            {image && (
              <div className="col-12">
                <GatsbyImage durationFadeIn={500} image={getImage(image)} />
              </div>
            )}

            <div className={`col-12 ${textWidth} `}>
              <div className="pl-0 pt-5">
                {title && (
                  <div className={adjustCenterText}>
                    <h1
                      className={`font-weight-bold text-uppercase ${hasTextAlign} `}
                    >
                      {title}
                    </h1>
                  </div>
                )}

                {showDivider && <Divider></Divider>}

                {text && (
                  <div className={adjustCenterText}>
                    <p
                      className={`body-text ${hasTextAlign}`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {text}
                    </p>
                  </div>
                )}

                {hasLink && (
                  <div className={`w-100 ${hasTextAlign}`}>
                    <Button to={pageLink.page}>{pageLink.btnTxt}</Button>
                  </div>
                )}

                {hasExternalLink && (
                  <div className={`w-100  ${hasTextAlign}`}>
                    <ExternalLink to={pageLink.externalLink}>
                      {pageLink.btnTxt}
                    </ExternalLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
export default FullWidthComp;
