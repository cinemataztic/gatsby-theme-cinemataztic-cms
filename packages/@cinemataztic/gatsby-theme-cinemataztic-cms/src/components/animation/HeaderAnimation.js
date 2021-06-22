/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 28-08-2019.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { TimelineMax, TweenMax, Back, Expo } from 'gsap'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Divider from '../Divider'
import DownArrow from '../display/DownArrow'
import ScrollListener from 'react-scroll-listen'
import { win } from '../../utils/browserMock'
import './header-animation.scss'

const HeaderAnimation = (props) => {
  const { letters, subhead, logoImg, overlayRef, featuredImageRef, textColor = '', height = '85vh', arrowColor } = props

  const [animationHasRun, setAnimationHasRun] = useState(0)

  let hasScrolled = false

  const dividerRef = React.createRef()
  const logoRef = logoImg ? React.createRef() : null
  const arrowRef = React.createRef()
  const subheadRef = useRef()
  const txtContainer = useRef()

  const myElements = []
  const myTween = new TimelineMax({ paused: false })

  const hasLetters = letters === '' ? 'no test' : letters

  const ltrs = hasLetters.split(/(\s+)/)

  const hasTextColor = textColor || 'FFFFFF'
  const validTextColor = '#' + hasTextColor.split('#').join('')

  const letterViews = ltrs.map((ltr, index) => {
    return (
      <span
        className="d-inline-block"
        key={index}
        style={{ whiteSpace: 'pre', color: validTextColor, opacity: 0 }}
        ref={(li) => (myElements[index] = li)}
      >
        {ltr}
      </span>
    )
  })

  const animationWithLogo = useCallback(() => {
    myTween.set(overlayRef.current, { y: 20 })
    myTween.set(dividerRef.current, { opacity: 0, y: 60 })
    myTween.set(logoRef.current, { scaleY: 2.5, opacity: 0, y: 100, transformOrigin: 'top' })

    if (featuredImageRef.current) {
      myTween.set(featuredImageRef.current, { opacity: 0, y: 60 })
    }

    myTween.set(subheadRef.current, { opacity: 0, skewX: 10, y: 30 })

    myTween.to(overlayRef.current, 1, { y: 0, opacity: 1, ease: Expo.easeOut }, '+=.2')

    myTween.to(logoRef.current, 1, { y: 0, scaleY: 1, opacity: 1, ease: Expo.easeOut })

    myTween.to(dividerRef.current, 0.8, { opacity: 1, y: 0, ease: Back.easeOut.config(2) }, '-=.6')

    myTween.staggerFromTo(
      myElements,
      0.6,
      { y: 60, x: 0, scaleY: 2, opacity: 0, ease: 'Expo.easeOut' },
      { scaleY: 1, y: 0, x: 0, opacity: 1, ease: 'Power3.easeInOut' },
      0.03,
      '-=.4'
    )

    myTween.to(subheadRef.current, 0.4, { y: 0, opacity: 1, skewX: 0, ease: Expo.easeOut }, '-=.2')

    if (featuredImageRef.current) {
      myTween.to(featuredImageRef.current, 0, { y: 0, opacity: 1, ease: Expo.easeOut }, '-=.2')
    }
  }, [myTween, featuredImageRef, dividerRef, logoRef, overlayRef, myElements])

  const animationWithoutLogo = useCallback(() => {
    myTween.set(overlayRef.current, { y: 20 })
    myTween.set(dividerRef.current, { opacity: 0, y: 60 })

    if (featuredImageRef.current) {
      myTween.set(featuredImageRef.current, { opacity: 0, y: 60 })
    }

    myTween.set(subheadRef.current, { opacity: 0, skewX: 10, y: 30 })

    myTween.to(overlayRef.current, 1, { y: 0, opacity: 1, ease: Expo.easeOut }, '+=.2')

    myTween.staggerFromTo(
      myElements,
      0.6,
      { y: 60, x: 0, scaleY: 2, opacity: 0, ease: 'Expo.easeOut' },
      { scaleY: 1, y: 0, x: 0, opacity: 1, ease: 'Power3.easeInOut' },
      0.03,
      '-=.8'
    )

    myTween.to(dividerRef.current, 0.5, { opacity: 1, y: 0, ease: Back.easeOut.config(2) }, '-=.3')

    myTween.to(subheadRef.current, { duration: 0.6, y: 0, opacity: 1, skewX: 0, ease: Expo.easeOut }, '-=.2')

    if (featuredImageRef.current) {
      myTween.to(featuredImageRef.current, 0.6, { y: 0, opacity: 1, ease: Expo.easeOut }, '-=.2')
    }
  }, [myTween, featuredImageRef, dividerRef, overlayRef, myElements])

  const headerEntryAnimation = useCallback(() => {
    if (!animationHasRun) {
      !logoRef && animationWithoutLogo()

      logoRef && animationWithLogo()

      TweenMax.set(arrowRef.current, { autoAlpha: 0, y: 0 })

      if (window.scrollY === 0) {
        myTween.to(arrowRef.current, 0.4, {
          autoAlpha: 1,
          y: 100,
          ease: Back.easeOut.config(3),
        })
        myTween.to(arrowRef.current, 0.4, {
          y: -100,
          ease: Back.easeOut,
          yoyo: true,
          repeat: 3,
        })
      }
    }
    setAnimationHasRun(true)
  }, [animationHasRun, setAnimationHasRun, animationWithLogo, animationWithoutLogo, arrowRef, myTween, logoRef])

  useEffect(() => headerEntryAnimation(), [headerEntryAnimation])

  const onScrolling = (value) => {
    if (value < 50 && !hasScrolled && arrowRef.current) {
      hasScrolled = true
      TweenMax.killTweensOf(arrowRef.current)
      TweenMax.to(arrowRef.current, 0.5, {
        autoAlpha: 0,
        ease: 'Expo.easeOut',
      })
    }
  }

  return (
    <div className="row page-component header-animation pl-0 pl-md-5" style={{ minHeight: 530, height: height }}>
      <ScrollListener onScroll={onScrolling} container={win} />

      <div ref={txtContainer} className="txt-container col-12 d-flex flex-column justify-content-center h-100 ">
        {logoRef && (
          <div ref={logoRef} className="pb-3 " style={{ maxWidth: 320 }}>
            <GatsbyImage className="img-fluid" durationFadeIn={500} image={getImage(logoImg)} alt="logo" />
          </div>
        )}

        {logoRef && <Divider ref={dividerRef} opacity={0} color={validTextColor} width={'10rem'} height={3}></Divider>}

        <h1 className="display-txt font-weight-bold text-uppercase head-txt " style={{}}>
          {letterViews}
        </h1>

        {!logoRef && <Divider ref={dividerRef} opacity={0} color={validTextColor} width={'10rem'} height={3} />}

        <div className="subhead">
          <h4
            ref={subheadRef}
            style={{
              color: validTextColor,
              opacity: 0,
              fontSize: 'calc(16px + 4 * ((100vw - 320px) / 680))',
              whiteSpace: 'pre-wrap',
            }}
          >
            {subhead}
          </h4>
        </div>
      </div>

      <DownArrow ref={arrowRef} arrowColor={arrowColor}></DownArrow>
    </div>
  )
}

export default HeaderAnimation
