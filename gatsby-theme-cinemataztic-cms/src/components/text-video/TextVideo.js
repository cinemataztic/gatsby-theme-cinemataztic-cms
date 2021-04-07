/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 08-10-2019.
 */
import React, { useRef } from "react";
import { win } from "../../utils/browserMock";
import Divider from "../Divider";
import Button from "../buttons/Button";
import ExternalLink from "../buttons/ExternalLink";
import { Waypoint } from "react-waypoint";
import TweenMax from "gsap";
import { withBreakpoints } from "react-breakpoints";
import get from "lodash.get";
import Player from "../full-width-video/Player";

const sizeColums = size => {
  // handle revers when image is switched
  switch (size) {
    case "33%":
      return ["col-lg-4 ", "col-lg-8"];

    case "50%":
      return ["col-lg-6", "col-lg-6"];

    case "66%":
      return ["col-lg-8", "col-lg-4"];

    case "83%":
      return ["col-lg-10", "col-lg-2"];
    default:
      return ["col-lg-6", "col-lg-6"];
  }
};

const TextVideo = ({ data, breakpoints, currentBreakpoint }) => {
  //
  // handle refs for animating
  //
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const txtRef = useRef(null);

  //
  // destructure props
  //
  const {
    placement,
    text,
    title,
    size,
    pageLink,
    shortTextVideo,
    hideControls,
    textVideoImage
  } = data;

  const hasLink = pageLink && pageLink.page ? true : false;
  const hasExternalLink =
    pageLink && pageLink.externalLink && pageLink.externalLink !== ""
      ? true
      : false;
  const isMobile = breakpoints[currentBreakpoint] < breakpoints.md;

  const orderImage = placement && !isMobile ? "order-lg-1 " : "order-0 ";
  const colSize = sizeColums(size);

  //https://storage.googleapis.com/groupm_videos/ARP-HANSEN%20HOTEL%20GROUP_INDENLANDSK%20FERIE_INDENLANDSK%20FERIE_83820.mp4

  const shortVideoUrl = get(shortTextVideo, "publicURL", null);
  const largeVideoUrl = get(data, "largeVideoUrl", null);

  const fluidCoverImage = get(textVideoImage, "childImageSharp.fluid", null);
  const videoUrl = shortVideoUrl ? shortVideoUrl : largeVideoUrl;

  //
  // Animation
  //
  const onEnter = value => {
    if (!value.previousPosition) {
      TweenMax.fromTo(
        containerRef.current,
        1.2,
        { y: 20, alpha: 0, ease: "Expo.easeOut" },
        { y: 0, alpha: 1, ease: "Expo.easeOut" }
      );
      TweenMax.to(txtRef.current, 1.2, {
        x: 0,
        alpha: 1,
        delay: 0.2,
        ease: "Expo.easeOut"
      });
      return;
    }

    if (value.previousPosition === "below") {
      TweenMax.fromTo(
        containerRef.current,
        1.2,
        { y: -20, alpha: 0, ease: "Expo.easeOut" },
        { y: 0, alpha: 1, ease: "Expo.easeOut" }
      );
      TweenMax.to(txtRef.current, 1.2, {
        x: 0,
        alpha: 1,
        delay: 0.2,
        ease: "Expo.easeOut"
      });
    } else {
      TweenMax.fromTo(
        containerRef.current,
        1.2,
        { y: -50, alpha: 0, ease: "Expo.easeOut" },
        { y: 0, alpha: 1, ease: "Expo.easeOut" }
      );
      TweenMax.to(txtRef.current, 1.2, {
        x: 0,
        alpha: 1,
        delay: 0.2,
        ease: "Expo.easeOut"
      });
    }
  };

  const onLeave = value => {
    if (value.currentPosition === "below") {
      TweenMax.to(containerRef.current, 1, {
        y: 200,
        alpha: 0,
        ease: "Expo.easeOut"
      });
      TweenMax.to(txtRef.current, 1.2, {
        x: -10,
        alpha: 0,
        ease: "Expo.easeOut"
      });
    }
  };

  return (
    <Waypoint
      bottomOffset="10%"
      onEnter={onEnter}
      onLeave={onLeave}
      scrollableAncestor={win}
    >
      <div
        ref={containerRef}
        className="row mx-auto page-component h-100 mb-5 pt-4 "
        style={{ height: "50vh", opacity: 0 }}
      >
        <div className="col-12 col-md-10 mx-auto p-0 ">
          <div className="row use-background pt-3 pt-md-0 ">
            <div
              ref={imageRef}
              className={`col-12 ${colSize[0]}  mt-5 mb-5 p-md-2 text-center my-auto p-lg-5 ${orderImage}`}
            >
              {/*<img className="p-lg-5 img-fluid" src={url} alt=""/>*/}
              {/*{fluidImage && <Img durationFadeIn={500} fluid={fluidImage}/>}*/}
              <Player
                url={videoUrl}
                showControls={hideControls}
                fluidCoverImage={fluidCoverImage}
                autoPlay={false}
              ></Player>
            </div>

            <div
              className={`col-12 ${colSize[1]} d-flex flex-column  justify-content-center p-4 `}
            >
              <h1 ref={txtRef} className="font-weight-bold text-uppercase mb-0">
                {title}
              </h1>
              <Divider></Divider>
              <p className="body-text" style={{ whiteSpace: "pre-wrap" }}>
                {text}
              </p>
              {hasLink && <Button to={pageLink.page}>{pageLink.btnTxt}</Button>}

              {hasExternalLink && (
                <ExternalLink to={pageLink.externalLink}>
                  {pageLink.btnTxt}
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
export default withBreakpoints(TextVideo);
//export default TextVideo
