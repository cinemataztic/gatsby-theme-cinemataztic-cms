/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 18-08-2019.
 */
import React, { useEffect, useRef } from "react";

import TweenMax from "gsap";
import { useHover } from "react-use-gesture";
import get from "lodash.get";
import AniWrapper from "../buttons/AniWrapper";
import validateLink from "../../utils/linkValidate";
import { Waypoint } from "react-waypoint";

const ListItem = ({ item, index, breakpoints, currentBreakpoint }) => {
  //console.log (" ListItem > item = " , item);

  const containerRef = useRef(null);
  const textRef = useRef(null);
  const {
    urlPath,
    parentPage,
    featuredContent,
    listImage
  } = item.node.frontmatter;

  const title = featuredContent.title.split("@").join("\n");
  const description = featuredContent.featuredDescription;
  const imgUrl = get(listImage, "childImageSharp.resolutions.src", null);

  // make sure there is no unwanted slashes
  const linkTo = validateLink(parentPage, urlPath);

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
          className="w-100 ml-2 d-flex justify-content-center "
          ref={containerRef}
        >
          <AniWrapper to={linkTo} duration={0.8} bg="#CCFF00">
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
                className={`w-100 h-100 position-absolute ${colorOverlayClass}`}
                style={{ top: 0, left: 0, zIndex: 5 }}
              ></div>
              <img
                className="img-fluid "
                style={{ opacity: 1 }}
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

/*



*/
