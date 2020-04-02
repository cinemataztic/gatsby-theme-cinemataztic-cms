import React, { useRef } from "react";
import { graphql } from "gatsby";
import get from "lodash.get";
import Img from "gatsby-image";

import componentFactory from "../utils/components-types";
import Layout from "../components/Layout";
import HeaderAnimation from "../components/animation/HeaderAnimation";
import "./page.scss";
import {
  getBackgroundImage,
  getVideoOverlay
} from "../utils/getBackgroundImage";
import NextPrevLink from "../components/next-prev-link/NextPrevLink";

const Page = React.memo(props => {
  const featuredImageRef = useRef();
  const overlayRef = useRef();
  const {
    coverImage,
    component,
    mainContent,
    backgroundImage,
    backgroundVideo,
    coverVideo,
    coverVideoCaptions,
    backgroundVideoCaptions,
    title,
    previousPage,
    nextPage
  } = props.data.pagesYaml;
  const { header, subhead, color } = mainContent;
  const headerWithSplit = header.split("@").join("\n");
  const fluidCoverImage = get(coverImage, "childImageSharp.fluid", null);
  const videoUrl = get(coverVideo, "publicURL", null);
  const backVideoUrl = get(backgroundVideo, "publicURL", null);

  // BACKGROUND IMAGE
  const backImageSrc = get(backgroundImage, "childImageSharp.fluid.src", null);
  const backImg = getBackgroundImage(color.backgroundColor, backImageSrc);
  const textColor = color.textColor || "FFFFFF";

  const videoOverlay = backVideoUrl
    ? getVideoOverlay(color.backgroundColor)
    : "";

  const components = componentFactory(component);

  return (
    <Layout meta={{ title }}>
      <div
        ref={overlayRef}
        className="overlay w-100 back-image-cover "
        style={{ backgroundImage: backImg, height: "100vh", opacity: 0 }}
      >
        {backVideoUrl && (
          <>
            <div
              className="vid-container"
              style={{ background: videoOverlay }}
            ></div>

            <video playsInline autoPlay="autoplay" muted="muted" loop="loop">
              <source src={backVideoUrl} type="video/mp4" />
              <track
                default
                kind="captions"
                srcLang="en"
                src={backgroundVideoCaptions || null}
              />
              Sorry, your browser does not support video.
            </video>
          </>
        )}
      </div>

      <div
        className="ani-page container-fluid h-100 position-relative overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <HeaderAnimation
          overlayRef={overlayRef}
          featuredImageRef={featuredImageRef}
          subhead={subhead}
          letters={headerWithSplit}
          textColor={textColor}
        />

        <div className="row position-relative h-100" style={{}}>
          {fluidCoverImage && (
            <div
              ref={featuredImageRef}
              className="col-12 col-md-10 mx-auto "
              style={{ opacity: 0 }}
            >
              <Img durationFadeIn={500} fluid={fluidCoverImage} />
            </div>
          )}

          {videoUrl && (
            <div ref={featuredImageRef} className="col-12 col-md-10 mx-auto ">
              <video
                style={{ maxWidth: "100%", height: "auto" }}
                autoPlay="autoplay"
                muted="muted"
                loop="loop"
              >
                <source src={videoUrl} type="video/mp4" />
                <track
                  default
                  kind="captions"
                  srcLang="en"
                  src={coverVideoCaptions}
                />
                Sorry, your browser does not support video.
              </video>
            </div>
          )}

          {!videoUrl && !fluidCoverImage && (
            <div
              ref={featuredImageRef}
              className="col-10 mx-auto "
              style={{ height: "15vh" }}
            ></div>
          )}
        </div>

        {components}

        <NextPrevLink
          nextPage={nextPage}
          previousPage={previousPage}
        />

      </div>
    </Layout>
  );
});

export default Page;

export const query = graphql`
  query($pageID: String!) {
    pagesYaml(id: { eq: $pageID }) {
      title
      slug
      coverImage {
        publicURL

        childImageSharp {
          fluid(quality: 70, maxWidth: 1400) {
            ...GatsbyImageSharpFluid_withWebp
          }
          resolutions(quality: 60) {
            aspectRatio
            width
            height
            src
          }
        }
      }

      coverVideo {
        publicURL
      }

      backgroundImage {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1920) {
            src
          }
        }
      }

      backgroundVideo {
        publicURL
      }

      mainContent {
        header
        subhead
        color {
          backgroundColor
          textColor
        }
      }
      
      component {
        placement
        text
        title
        type
        listContent {
          id
          title
          slug
          backgroundImage {
            publicURL
            childImageSharp {
              fluid(maxWidth: 400) {
                src
              }
            }
          }
          coverImage {
            publicURL
            childImageSharp {
              fluid(maxWidth: 400) {
                src
              }
            }
          }
          featuredContent {
            title
            description
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 400) {
                  src
                }
              }
            }
          }
        }
        featured
        size
        textAlign
        hideControls

        fullWidthVideo {
          publicURL
        }

        largeVideoUrl
        autoplay

        textVideoImage {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

        shortTextVideo {
          publicURL
        }

        textImage {
          publicURL
          childImageSharp {
            fluid(quality: 70, maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

        fullWidthImage {
          publicURL
          childImageSharp {
            fluid(quality: 70, maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

        fullWidthVideoImage {
          publicURL
          childImageSharp {
            fluid(quality: 70, maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

        images {
          multipleItemImage {
            publicURL
            childImageSharp {
              fluid(quality: 70, maxWidth: 1400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }

        pageLink {
          btnTxt
          externalLink
          page {
            title
            slug
          }
        }
      }
      
      previousPage {
        slug
        title
        mainContent {
          header
          subhead
        }
      }
      nextPage {
        title
        slug
        mainContent {
          header
          subhead
        }
      }

    }
  }
`;
