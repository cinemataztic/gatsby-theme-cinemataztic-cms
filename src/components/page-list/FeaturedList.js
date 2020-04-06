/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 18-08-2019.
 */

import React, { useEffect, useRef } from "react";
import TweenMax from "gsap";
import "./featured-list.scss";
import { withBreakpoints } from "react-breakpoints";
import get from "lodash.get";
import { ReactComponent as Forward } from "../../assets/forward.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import AniWrapper from "../buttons/AniWrapper";

const getPos = index => {
  if (index === 0) {
    return { top: -25, left: -20 };
  }
  if (index === 1) {
    return { bottom: -25, left: -20 };
  }
  if (index === 2) {
    return { top: -40, right: -20, textAlign: "right" };
  }
};

const getAmount = (breakpoints, currentBreakpoint) => {
  if (currentBreakpoint === "xxxl") {
    return 5;
  }

  if (currentBreakpoint === "xxl") {
    return 4;
  }

  if (currentBreakpoint === "lg" || currentBreakpoint === "xl") {
    return 3;
  }

  if (currentBreakpoint === "md") {
    return 2;
  }

  if (currentBreakpoint === "sm") {
    return 1;
  }
  return 1;
};

const FeaturedItem = React.forwardRef(({ index, item }, ref) => {
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

  title = title.split("@").join("\n");

  const imgUrl = get(image, "childImageSharp.fluid.src", null);
  const txtPos = getPos(index % 2);
  const colorOverlayClass = "image-overlay-" + (index % 2);

  return (
    <div
      ref={ref}
      className="position-absolute p-md-4 w-sm-100 "
      style={{ top: 0, left: 0, opacity: 0 }}
    >
      <div className="d-flex justify-content-center justify-content-md-start">
        <div className="" style={{ width: 310, height: 473 }}>
          <AniWrapper to={slug} duration={0.8} bg="#323232">
            <div className="position-relative">
              <div
                className="position-absolute"
                style={{ zIndex: 10, ...txtPos }}
              >
                <h2
                  className=" text-uppercase font-weight-bold w-80"
                  style={{
                    fontSize:
                      "calc(30px + (40 - 24) * ((100vw - 300px) / (1600 - 300)))",
                    zIndex: 10,
                    userSelect: "none",
                    pointerEvents: "none"
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
                style={{
                  top: 0,
                  left: 0,
                  zIndex: 5,
                  userSelect: "none",
                  pointerEvents: "none"
                }}
              ></div>
              <img
                className="img-fluid position-relative"
                style={{
                  boxShadow: "1.878px 10px 43px 0px rgba(0, 0, 0, .5)"
                }}
                src={imgUrl}
                alt=""
              />
            </div>
          </AniWrapper>
        </div>
      </div>
    </div>
  );
});

const FeaturedList = props => {
  const itemContainerRef = useRef();
  const nextBtn = useRef();
  const backBtn = useRef();
  const { breakpoints, currentBreakpoint } = props;
  const data = props.data;
  const { listContent } = data;
  const visibleElements = getAmount(breakpoints, currentBreakpoint);

  const myElements = [];
  let activeIndex = 0;

  useEffect(() => {
    const containerWidth = itemContainerRef.current
      ? Math.round(itemContainerRef.current.clientWidth / visibleElements)
      : 0;
    TweenMax.to(backBtn.current, 0.5, { alpha: 0, ease: "Expo.easeOut" });
    myElements.forEach((item, i) => {
      let a = 1;

      const k = activeIndex + visibleElements;
      if (i >= k) {
        a = 0;
      }

      const modulus = i % visibleElements;
      const pushDown = modulus === 1 ? 78 : modulus === 2 ? -2 : 30;
      const xpos = containerWidth * i;
      TweenMax.to(item.ref, 1, {
        x: xpos,
        opacity: a,
        y: pushDown,
        delay: i / 30,
        ease: "Expo.easeOut"
      });
    });
  });

  const gotoPrev = () => {
    if (activeIndex === 0) {
      return;
    }

    activeIndex--;
    const xOffset =
      itemContainerRef.current.clientLeft +
      Math.round(itemContainerRef.current.clientWidth / visibleElements) *
      activeIndex;
    const containerWidth = itemContainerRef.current
      ? Math.round(itemContainerRef.current.clientWidth / visibleElements)
      : 0;

    if (activeIndex === 0) {
      TweenMax.to(backBtn.current, 0.5, {
        alpha: 0,
        x: -40,
        ease: "Expo.easeOut"
      });
    }

    console.log(
      " FeaturedList > activeIndex + visibleElements  = ",
      activeIndex + visibleElements,
      myElements.length
    );
    if (activeIndex + visibleElements <= myElements.length - 1) {
      console.log(" FeaturedList > show new = ");
      TweenMax.to(nextBtn.current, 0.5, {
        alpha: 1,
        x: 0,
        ease: "Expo.easeOut"
      });
    }

    myElements.forEach((item, i) => {
      let a = 1;
      const k = activeIndex + visibleElements;
      if (i >= k || i < activeIndex) {
        a = 0;
      }
      const xpos = containerWidth * i;
      TweenMax.to(item.ref, 1, {
        x: -xOffset + xpos,
        opacity: a,
        delay: i / 30,
        ease: "Expo.easeOut"
      });
    });
  };

  const gotoNext = () => {
    if (activeIndex + visibleElements > myElements.length - 1) {
      return;
    }

    activeIndex++;
    const xOffset =
      itemContainerRef.current.clientLeft +
      Math.round(itemContainerRef.current.clientWidth / visibleElements) *
      activeIndex;
    const containerWidth = itemContainerRef.current
      ? Math.round(itemContainerRef.current.clientWidth / visibleElements)
      : 0;

    if (activeIndex + visibleElements > myElements.length - 1) {
      TweenMax.to(nextBtn.current, 0.5, {
        alpha: 0,
        x: 40,
        ease: "Expo.easeOut"
      });
    }

    TweenMax.to(backBtn.current, 0.5, { alpha: 1, x: 0, ease: "Expo.easeOut" });

    myElements.forEach((item, i) => {
      let a = 1;

      const k = activeIndex + visibleElements;

      const xpos = containerWidth * i;
      if (i >= k) {
        a = 0;
      }

      TweenMax.to(item.ref, 1, {
        x: -xOffset + xpos,
        opacity: a,
        delay: i / 30,
        ease: "Expo.easeOut"
      });
    });
  };

  return (
    <div
      className="row mb-5 mt-5 featured-list position-relative "
      style={{ minHeight: "75vh", zIndex: 300 }}
    >
      <div className="col-12 position-relative">
        <div
          className="position-absolute h-100 "
          style={{ zIndex: 100, top: 0, left: 0 }}
        >
          <div
            ref={backBtn}
            className="h-100 d-flex flex-column justify-content-center "
          >
            <div
              onClick={gotoPrev}
              onKeyPress={gotoPrev}
              role="button"
              tabIndex="0"
              className="no-outline"
            >
              <div
                className="pointer "
                style={{ background: "black", width: 40, height: 60 }}
              >
                <div className="h-100 d-flex flex-column justify-content-center">
                  <Back style={{ width: 40, height: 30 }}></Back>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="position-absolute h-100 "
          style={{ zIndex: 101, top: 0, right: 0 }}
        >
          <div
            ref={nextBtn}
            className="h-100 d-flex flex-column justify-content-center "
          >
            <div
              onClick={gotoNext}
              onKeyPress={gotoNext}
              role="button"
              tabIndex="0"
              className="pointer pt-4 pb-4 no-outline"
            >
              <div
                className="my-auto myElements.length"
                style={{ background: "black", width: 40, height: 60 }}
              >
                <div className="h-100 d-flex flex-column justify-content-center">
                  <Forward style={{ width: 40, height: 30 }}></Forward>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row " style={{}}>
          <div
            ref={itemContainerRef}
            className="col-12 col-md-10 d-flex mx-auto"
            style={{ background: "red" }}
          >
            {listContent.map((item, index) => {
              myElements[index] = { pos: 0, ref: null };
              const xpos = 0;
              return (
                <FeaturedItem
                  ref={li => (myElements[index].ref = li)}
                  item={item}
                  key={item.id}
                  visibleElements={visibleElements}
                  index={index}
                  xpos={xpos}
                ></FeaturedItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBreakpoints(FeaturedList);
