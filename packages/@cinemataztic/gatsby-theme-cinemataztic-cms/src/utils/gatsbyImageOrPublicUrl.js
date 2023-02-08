import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 20/08/2021.
 */
export const gatsbyImageOrPublicUrl = (queryImage, imgTagStyle = { width: '100%' }) => {
  if (queryImage && queryImage.childImageSharp) {
    return <GatsbyImage image={getImage(queryImage)} className="img-fluid" alt="text image component" />
  }
  if (queryImage && !queryImage.childImageSharp && queryImage.publicURL) {
    return <img style={imgTagStyle} src={queryImage.publicURL} />
  }

  throw new Error('Query image could not be matched')
}
