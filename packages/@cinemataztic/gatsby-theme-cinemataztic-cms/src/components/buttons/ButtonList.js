/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 30/08/2021.
 */
import React from 'react'
import ExternalLink from './ExternalLink'
import Button from './Button'

const getAlign = (align) => {
  if (align === 'left') {
    return ''
  }
  if (align === 'center') {
    return 'justify-content-center'
  }
  if (align === 'right') {
    return 'justify-content-end'
  }

  return ''
}
const ButtonList = ({ data, align, pageLink }) => {
  const buttonList = data || []
  const classStr = 'd-flex w-100 flex-wrap ' + getAlign(align)

  const hasLink = pageLink && pageLink.page ? true : false
  const hasExternalLink = pageLink && pageLink.externalLink && pageLink.externalLink !== '' ? true : false

  return (
    <div className={classStr}>
      {hasLink && (
        <Button to={pageLink.page} pageLink={pageLink}>
          {pageLink.btnTxt}
        </Button>
      )}

      {hasExternalLink && (
        <ExternalLink to={pageLink.externalLink} pageLink={pageLink}>
          {pageLink.btnTxt}
        </ExternalLink>
      )}

      {buttonList.map((btn, index) => {
        const external = btn.externalLink
        const typeExternal = external ? true : false

        return typeExternal ? (
          <ExternalLink key={index} to={btn.externalLink} pageLink={btn}>
            {btn.btnTxt}
          </ExternalLink>
        ) : (
          <Button key={index} to={btn.page} pageLink={btn}>
            {btn.btnTxt}
          </Button>
        )
      })}
    </div>
  )
}
export default ButtonList
