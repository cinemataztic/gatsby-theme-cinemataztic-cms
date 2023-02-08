import hexToRgba from 'hex-to-rgba'

/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 02-09-2019.
 */

const getBackgroundImage = (backgroundColor, backImg) => {
  if (!backgroundColor && !backImg) {
    return ''
  }

  if (!backgroundColor && backImg) {
    return 'url(' + backImg + ')'
  }

  let from = ''
  let to = ''
  if (backgroundColor && !backImg) {
    let from = hexToRgba(backgroundColor, '0.75')
    let to = hexToRgba(backgroundColor, '1')
    return `linear-gradient(${from}, ${to} )`
  }

  from = hexToRgba(backgroundColor, '0.5')
  to = hexToRgba(backgroundColor, '1')

  return `linear-gradient(${from}, ${to} ), url(${backImg})`
}

const getVideoOverlay = (backgroundColor) => {
  if (!backgroundColor) {
    return 'linear-gradient( rgba(50,50,50, 0 ) 0% 80% , rgba(50,50,50,1) 100% )'
  }
  let from = hexToRgba(backgroundColor, '0.80')
  let to = hexToRgba(backgroundColor, '.01')
  return `linear-gradient(${from}, ${to} )`
}

export { getBackgroundImage, getVideoOverlay }
