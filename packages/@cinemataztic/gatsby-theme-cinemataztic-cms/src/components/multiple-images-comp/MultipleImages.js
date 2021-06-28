/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 17-09-2019.
 */
import React, { useEffect, useRef } from 'react'
import { TweenMax } from 'gsap'
import { Waypoint } from 'react-waypoint'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Divider from '../Divider'

const MultipleImages = (props) => {
  const myElement = useRef()
  const { title, text, images } = props.data
  const showDivider = !text ? false : true

  const imageArr = images.map((item, index) => {
    const image = item.multipleItemImage

    return (
      <div key={index} className="col-12 mt-4 pl-0 pr-0">
        {image ? <GatsbyImage image={getImage(image)} /> : <p>no images found</p>}
      </div>
    )
  })

  useEffect(() => {
    TweenMax.set(myElement.current, { alpha: 0, y: 200 })
  }, [])

  const onEnter = () => {
    TweenMax.fromTo(
      myElement.current,
      1.2,
      { alpha: 0, y: 100, delay: 0.2, ease: 'Expo.easeOut' },
      { alpha: 1, y: 0, delay: 0.2, ease: 'Expo.easeOut' }
    )
  }

  const onLeave = () => {
    TweenMax.to(myElement.current, 0.5, {
      alpha: 0,
      y: 0,
      ease: 'Expo.easeOut',
    })
  }

  return (
    <Waypoint onEnter={onEnter} onLeave={onLeave}>
      <div ref={myElement} className="row page-component full-width-comp" style={{ opacity: 0 }}>
        <div className="col-12 col-md-10 mx-auto">
          <div className="row" style={{}}>
            <div className={`col-12 `}>
              <div className="pl-0 pt-5">
                {title && <h1 className="font-weight-bold text-uppercase">{title}</h1>}

                {showDivider && <Divider></Divider>}

                {text && (
                  <p className="body-text" style={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                  </p>
                )}
              </div>
            </div>
          </div>

          {imageArr}
        </div>
      </div>
    </Waypoint>
  )
}
export default MultipleImages
