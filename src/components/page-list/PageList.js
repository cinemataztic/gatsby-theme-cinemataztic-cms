/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 25-07-2019.
 */

import React from "react";
import FeaturedList from "./FeaturedList";
import ListItem from "./ListItem";
import "./page-list.scss";
import ReactBreakpoints, { Media } from "react-breakpoints";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const PageList = React.memo(props => {
  const { listContent, featured } = props.data;
  const showAsFeatured = featured;

  // basic Error handling - so it does not blow up
  if (!listContent || listContent.length === 0) {
    console.log(" PageList > COULD NOT FIND LIST = ", props);
    return <div>Error list could not be found</div>;
  }

  if (showAsFeatured) {
    return <FeaturedList data={props.data}></FeaturedList>;
  }

  return (
    <ReactBreakpoints breakpoints={breakpoints}>
      <Media>
        {({ breakpoints, currentBreakpoint }) => {
          console.log(
            " PageList > breakpoints = ",
            breakpoints[currentBreakpoint]
          );

          return (
            <div className="row page-list ">
              <div className="col-10 mx-auto mb-5"></div>

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
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }}
      </Media>
    </ReactBreakpoints>
  );
});

export default PageList;
