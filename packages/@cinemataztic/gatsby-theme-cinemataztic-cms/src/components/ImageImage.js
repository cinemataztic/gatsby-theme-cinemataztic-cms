/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 23-07-2019.
 */
import React, { useRef } from 'react'
import Divider from './Divider'
import TweenMax from 'gsap'
import { Waypoint } from 'react-waypoint'
import Button from './buttons/Button'
import { win } from '../utils/browserMock'
import get from 'lodash.get'
import { withBreakpoints } from 'react-breakpoints'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import ExternalLink from './buttons/ExternalLink'
import { DEFAULT_CONTENT_BACKGROUND_COLOR } from '../constants'
import { gatsbyImageOrPublicUrl } from '../utils/gatsbyImageOrPublicUrl'

const sizeColums = (size) => {
  // handle revers when image is switched
  switch (size) {
    case '33%':
      return ['col-lg-4 ', 'col-lg-8']

    case '50%':
      return ['col-lg-6', 'col-lg-6']

    case '66%':
      return ['col-lg-8', 'col-lg-4']

    case '83%':
      return ['col-lg-10', 'col-lg-2']
    default:
      return ['col-lg-6', 'col-lg-6']
  }
}

const TextImage = ({ data, breakpoints, currentBreakpoint }) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const txtRef = useRef(null)
  const { firstImage, secondImage, placement, text, title, size, pageLink, contentBackgroundColor } = data

  const hasLink = pageLink && pageLink.page ? true : false
  const hasExternalLink = pageLink && pageLink.externalLink && pageLink.externalLink !== '' ? true : false

  const colSize = sizeColums(size)

  // On mobile the image is always placed on top
  const isMobile = breakpoints[currentBreakpoint] < breakpoints.md
  const orderImage = placement && !isMobile ? 'order-lg-1 ' : 'order-0 '

  const onEnter = (value) => {
    if (!value.previousPosition || value.previousPosition === 'below') {
      TweenMax.to(containerRef.current, 1.2, {
        y: 0,
        alpha: 1,
        ease: 'Expo.easeOut',
      })
      TweenMax.to(txtRef.current, 1.2, {
        x: 0,
        alpha: 1,
        delay: 0.2,
        ease: 'Expo.easeOut',
      })
    }
  }

  const onLeave = (value) => {
    if (value.currentPosition === 'below') {
      TweenMax.to(containerRef.current, 1, {
        y: 200,
        alpha: 0,
        ease: 'Expo.easeOut',
      })
      TweenMax.to(txtRef.current, 1.2, {
        x: -10,
        alpha: 0,
        ease: 'Expo.easeOut',
      })
    }
  }

  return (
    <Waypoint bottomOffset="10%" onEnter={onEnter} onLeave={onLeave} scrollableAncestor={win}>
      <div
        ref={containerRef}
        className="row mx-auto page-component h-100 mb-5 pt-4 text-video "
        style={{ height: '50vh', opacity: 0 }}
      >
        <div className="col-12 col-md-10 mx-auto p-0 ">
          <div className="row overflow-hidden" style={{ maxHeight: 600 }}>
            <div className="col-6 px-0 ">
              {/*{image && image.childImageSharp && <GatsbyImage image={getImage(image)} alt="text image component" />}
              {image && !image.childImageSharp && image.publicURL && (
                <img style={{ width: '100%' }} src={image.publicURL} />
              )}*/}
              {gatsbyImageOrPublicUrl(firstImage)}
            </div>
            <div className="col-6 px-0">
              {gatsbyImageOrPublicUrl(secondImage)}
              {/*{secondImage && secondImage.childImageSharp && (
                <GatsbyImage image={getImage(secondImage)} alt="text image component" />
              )}
              {secondImage && !secondImage.childImageSharp && secondImage.publicURL && (
                <img style={{ width: '100%' }} src={secondImage.publicURL} />
              )}*/}
            </div>
          </div>

          <div
            className="row pt-3 pt-md-0 "
            style={{ background: contentBackgroundColor || DEFAULT_CONTENT_BACKGROUND_COLOR }}
          >
            {/* <div
              ref={imageRef}
              className={`col-12 ${colSize[0]}  mt-5 mb-5 p-md-2 text-center my-auto p-lg-5 ${orderImage}`}
            >
              {image && image.childImageSharp && <GatsbyImage image={getImage(image)} alt="text image component" />}
              {image && !image.childImageSharp && image.publicURL && (
                <img style={{ width: '100%' }} src={image.publicURL} />
              )}
            </div>*/}

            <div className={`col-12 ${colSize[1]} d-flex flex-column  justify-content-center p-4 `}>
              <h1 ref={txtRef} className="font-weight-bold text-uppercase mb-0">
                {title}
              </h1>
              <Divider></Divider>
              <p className="body-text" style={{ whiteSpace: 'pre-wrap' }}>
                {text}
              </p>

              {hasLink && <Button to={pageLink.page}>{pageLink.btnTxt}</Button>}

              {hasExternalLink && <ExternalLink to={pageLink.externalLink}>{pageLink.btnTxt}</ExternalLink>}
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  )
}
export default withBreakpoints(TextImage)

/*
<VisibilitySensor onChange={onChange}>
   </VisibilitySensor>*/
