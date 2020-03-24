import React, { useRef } from "react";
import { graphql } from "gatsby";

import componentFactory from "../utils/components-types";
import Layout from "../components/Layout";
import HeaderAnimation from "../components/animation/HeaderAnimation";
import get from "lodash.get";
import "./page.scss";
import Img from "gatsby-image";
import {
  getBackgroundImage,
  getVideoOverlay
} from "../utils/getBackgroundImage";

const Page = React.memo(props => {
  const featuredImageRef = useRef();
  const overlayRef = useRef();
  const pageListArr = props.data.edges;
  const {
    coverImage,
    component,
    mainContent,
    backgroundImage,
    coverVideo,
    coverVideoCaptions,
    backgroundVideo,
    backgroundVideoCaptions,
    title
  } = props.data.pagesYaml;
  const { header, subhead, color } = mainContent;
  const headerWithSplit = header.split("@").join("\n");
  const fluidCoverImage = get(coverImage, "childImageSharp.fluid", null);
  const videoUrl = get(coverVideo, "publicURL", null);
  const backVideoUrl = get(backgroundVideo, "publicURL", null);

  // BACKGROUND IMAGE
  const backImageSrc = get(
    backgroundImage,
    "childImageSharp.resolutions.src",
    null
  );
  const backImg = getBackgroundImage(color.backgroundColor, backImageSrc);
  const textColor = color.textColor || "FFFFFF";

  const videoOverlay = backVideoUrl
    ? getVideoOverlay(color.backgroundColor)
    : "";

  const components = componentFactory(component, pageListArr);

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
                srclang="en"
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
                  srclang="en"
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
      mainContent {
        header
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
        listContent
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
          link
          externalLink
          sublink
        }
      }
    }
  }
`;

/* export const query = graphql`
  query PageIdQuery($pageId: String!, $allList: [String]) {
    allPage(id: { eq: $pageId }) {
      id
      frontmatter {
        urlPath
        title
        componentType

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
            resolutions(quality: 60) {
              aspectRatio
              width
              height
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
          listContent
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
            link
            externalLink
            sublink
          }
        }
      }
    }

    allMarkdownRemark(filter: { frontmatter: { urlPath: { in: $allList } } }) {
      edges {
        node {
          id

          frontmatter {
            title
            componentType
            urlPath
            parentPage

            featuredContent {
              featuredDescription
              title
            }

            listImage {
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

            component {
              listContent
              pageLink {
                btnTxt
                link
                externalLink
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`; */