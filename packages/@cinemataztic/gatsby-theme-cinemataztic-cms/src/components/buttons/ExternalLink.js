/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 17-09-2019.
 */
import React from 'react'

const ExternalLink = ({ to, children, pageLink = {}, className = 'btn btn-primary py-2 mr-1 mb-1' }) => {
  const { btnColor = '#3a7bad', textColor = '#212529' } = pageLink
  const isOutlineType = pageLink.buttonType === 'outline'

  return (
    <div>
      <a
        className={className}
        href={to}
        style={{
          background: isOutlineType ? 'transparent' : btnColor,
          border: isOutlineType ? `2px solid ${btnColor}` : 'none',
          color: textColor,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}{' '}
      </a>
    </div>
  )
}
export default ExternalLink
