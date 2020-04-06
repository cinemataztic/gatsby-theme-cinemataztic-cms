/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 18-08-2019.
 */
import React, { useEffect, useRef } from "react";

import TweenMax from "gsap";
import { useHover } from "react-use-gesture";
import get from "lodash.get";
import AniWrapper from "../buttons/AniWrapper";
import { Waypoint } from "react-waypoint";

const ListItem = ({ item, index, breakpoints, currentBreakpoint }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  let {
    featuredContent,
    mainContent,
    slug,
    title,
    coverImage,
    backgroundImage
  } = item;
  let description = "";
  let image = coverImage;

  if (backgroundImage) {
    image = backgroundImage;
  }

  if (mainContent) {
    if (mainContent.header) {
      title = mainContent.header;
    }
    if (mainContent.subhead) {
      description = mainContent.subhead;
    }
  }

  if (featuredContent) {
    if (featuredContent.title) {
      title = featuredContent.title;
    }
    if (featuredContent.image) {
      image = featuredContent.image;
    }
    if (featuredContent.description) {
      description = featuredContent.description;
    }
  }

  const imgUrl = get(image, "childImageSharp.fluid.src", null);

  useEffect(() => {
    TweenMax.set(containerRef.current, { alpha: 0, y: 100 });
  }, []);

  const onEnter = () => {
    TweenMax.to(containerRef.current, 1, {
      alpha: 1,
      y: 0,
      delay: index / 10,
      ease: "Expo.easeOut"
    });
  };

  const bind = useHover(({ hovering }) => {
    TweenMax.to(textRef.current, 0.5, {
      y: hovering ? -20 : 0,
      ease: "Expo.easeOut"
    });
  });

  const getPos = index => {
    if (index === 0) {
      return { top: -40, left: -25 };
    }
    if (index === 1) {
      return { bottom: -40, left: -25 };
    }
    if (index === 2) {
      return { top: -40, right: -15, textAlign: "right" };
    }
  };

  const smallScreen = breakpoints[currentBreakpoint] <= breakpoints["md"];
  const colorOverlayClass = smallScreen
    ? "item-overlay-0"
    : "item-overlay-" + (index % 3); //+ (i % 3)
  const txtPos = smallScreen ? getPos(0) : getPos(index % 3);

  return (
    <Waypoint onEnter={onEnter}>
      <div className="col-12 col-md-6 col-lg-4 listItem w-100 mb-5 mt-5 ">
        <div
          className="w-100 ml-2 d-flex justify-content-center"
          ref={containerRef}
        >
          <AniWrapper to={slug} duration={0.8} bg="#CCFF00">
            <div {...bind()} className="position-relative">
              <div
                ref={textRef}
                className="w-100 position-absolute"
                style={{ zIndex: 10, ...txtPos }}
              >
                <h2
                  className=" display-4 text-uppercase font-weight-bold "
                  style={{
                    fontSize:
                      "calc(36px + (40 - 24) * ((100vw - 300px) / (1600 - 300)))"
                  }}
                >
                  {title}
                </h2>
                <p>{description}</p>
              </div>

              <div
                className={`w-100 h-100 position-absolute ${
                  imgUrl ? colorOverlayClass : ""
                  }`}
                style={{ top: 0, left: 0, zIndex: 5 }}
              ></div>
              <img
                className="img-fluid "
                style={{
                  opacity: 1,
                  boxShadow: "1.878px 10px 43px 0px rgba(0, 0, 0, .5)"
                }}
                src={imgUrl}
                alt=""
              />
            </div>
          </AniWrapper>
        </div>
      </div>
    </Waypoint>
  );
};
export default ListItem;
