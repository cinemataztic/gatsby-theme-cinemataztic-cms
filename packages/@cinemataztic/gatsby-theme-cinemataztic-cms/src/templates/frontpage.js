import React, { useRef } from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import get from "lodash.get";

import Layout from "../components/Layout";
import "../components/frontpage/frontpage.scss";
import HeaderAnimation from "../components/animation/HeaderAnimation";
import componentFactory from "../utils/components-types";
import {
  getBackgroundImage,
  getVideoOverlay
} from "../utils/getBackgroundImage";

const FrontPage = props => {
  const featuredImageRef = useRef();
  const overlayRef = useRef();

  const {
    mainContent,
    component,
    backgroundVideo,
    backgroundVideoCaptions,
    title
  } = props.data.frontpageYaml;
  const { header, subhead, backgroundColor } = mainContent;
  const headerWithSplit = header.split("@").join("\n");

  const fluid = get(mainContent, "coverImage.childImageSharp.fluid", null);
  const videoUrl = get(backgroundVideo, "publicURL", null);

  const backImg = get(fluid, "src", null);
  const mainImage = getBackgroundImage(backgroundColor, backImg);
  const videoOverlay = getVideoOverlay(null);

  // Get all components on page
  const components = componentFactory(component);

  return (
    <Layout meta={{ title }}>
      <div
        ref={overlayRef}
        className="overlay w-100 back-image-cover "
        style={{ backgroundImage: mainImage, height: "100vh", opacity: 0 }}
      >
        {videoUrl && (
          <>
            <div
              className="vid-container"
              style={{ background: videoOverlay }}
            ></div>
            <video playsInline autoPlay="autoplay" muted="muted" loop="loop">
              <source src={videoUrl} type="video/mp4" />
              <track
                default
                kind="captions"
                srcLang="en"
                src={backgroundVideoCaptions}
              />
            </video>
          </>
        )}
      </div>

      <div
        className="ani-page container-fluid h-100 position-relative overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <HeaderAnimation
          height={"100vh"}
          overlayRef={overlayRef}
          featuredImageRef={featuredImageRef}
          subhead={subhead}
          letters={headerWithSplit}
        />

        <div className="row position-relative h-100" style={{}}>
          {fluid && (
            <div ref={featuredImageRef} className="col-10 mx-auto ">
              <GatsbyImage image={fluid} durationFadeIn={500} />
            </div>
          )}

          {!videoUrl && !fluid && (
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
};

export const query = graphql`{
  frontpageYaml {
    id
    title
    backgroundVideo {
      publicURL
    }
    mainContent {
      header
      subhead
    }
    component {
      size
      placement
      text
      title
      type
      listContent {
        id
        title
        slug
        mainContent {
          header
          subhead
        }
        backgroundImage {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        coverImage {
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        featuredContent {
          title
          description
          image {
            publicURL
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
      featured
      textAlign
      textVideoImage {
        childImageSharp {
          gatsbyImageData(quality: 70, layout: FULL_WIDTH)
        }
      }
      shortTextVideo {
        publicURL
      }
      textImage {
        publicURL
        childImageSharp {
          gatsbyImageData(quality: 70, layout: FULL_WIDTH)
        }
      }
      fullWidthImage {
        publicURL
        childImageSharp {
          gatsbyImageData(quality: 70, layout: FULL_WIDTH)
        }
      }
      images {
        multipleItemImage {
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 70, layout: FULL_WIDTH)
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
  }
}
`;

export default FrontPage;
