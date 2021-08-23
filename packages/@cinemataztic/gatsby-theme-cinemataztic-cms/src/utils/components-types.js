/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 23-07-2019.
 */

import React from 'react'
import TextImage from '../components/TextImage'
import PageList from '../components/page-list/PageList'
import FullWidthComp from '../components/full-width-comp/FullWidthComp'
import FullWidthVideo from '../components/full-width-video/FullWidthVideo'
import MultipleImages from '../components/multiple-images-comp/MultipleImages'
import TextVideo from '../components/text-video/TextVideo'
import ImageImage from '../components/ImageImage'

const componentFromString = (componentData, index) => {
  const type = componentData.type
  console.log(' components-types > type = ', type)

  switch (type) {
    case 'TextImage':
      return <TextImage key={index} data={componentData} />

    case 'ImageImage':
      return <ImageImage key={index} data={componentData} />

    case 'FullWidthComponent':
      return <FullWidthComp key={index} data={componentData} />

    case 'TextVideo':
      return <TextVideo key={index} data={componentData} />

    case 'PageList':
      return <PageList key={index} data={componentData} />

    case 'FullWidthVideo':
      return <FullWidthVideo key={index} data={componentData} />

    case 'multipleImages':
      return <MultipleImages key={index} data={componentData} />

    default:
      return <div key={index}>NO component match: {type}</div>
  }
}

//---------------------------------------------------------------------------------------

const componentFactory = (componentsArr) => {
  if (!componentsArr || componentsArr.length === 0) {
    return []
  }
  return componentsArr.map((item, index) => {
    return componentFromString(item, index)
  })
}

export default componentFactory
