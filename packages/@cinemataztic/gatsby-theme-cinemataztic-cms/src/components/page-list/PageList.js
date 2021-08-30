/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 25-07-2019.
 */

import React from 'react'
import FeaturedList from './FeaturedList'
import ListItem from './ListItem'
import './page-list.scss'
import ReactBreakpoints, { Media } from 'react-breakpoints'
import Divider from '../Divider'

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

const PageList = React.memo((props) => {
  const { listContent, featured, title } = props.data
  const showAsFeatured = featured

  console.log(' PageList > props.data   = ', props.data)

  // basic Error handling - so it does not blow up
  if (!listContent || listContent.length === 0) {
    return <div>Error list could not be found</div>
  }

  if (showAsFeatured) {
    return (
      <>
        <div className="container-fluid " style={{ maxWidth: 2000 }}>
          <div className="row" style={{}}>
            <div className="col-11 mt-5 mx-auto d-flex align-items-center">
              <Divider></Divider>

              <p className="mb-0 ml-3">{title}</p>
            </div>
          </div>
        </div>
        <FeaturedList data={props.data}></FeaturedList>
      </>
    )
  }

  return (
    <ReactBreakpoints breakpoints={breakpoints}>
      <Media>
        {({ breakpoints, currentBreakpoint }) => {
          return (
            <div className="row page-list ">
              <div className="col-12 col-lg-10 mx-auto">
                <div className="row" style={{}}>
                  {listContent.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        breakpoints={breakpoints}
                        currentBreakpoint={currentBreakpoint}
                        index={index}
                        item={item}
                      ></ListItem>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }}
      </Media>
    </ReactBreakpoints>
  )
})

export default PageList
