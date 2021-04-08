import React from "react";
import Navigation from "../components/navigation/Navigation";
import ReactBreakpoints, { Media } from "react-breakpoints";
import "../styles/styles.scss";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1800,
  xxxl: 2000
};

export default ({ children }) => (
  <ReactBreakpoints breakpoints={breakpoints}>
    <Media>
      {({ breakpoints, currentBreakpoint }) => {
        return (
          <Navigation
            breakpoints={breakpoints}
            currentBreakpoint={currentBreakpoint}
          ></Navigation>
        );
      }}
    </Media>

    {children}
  </ReactBreakpoints>
);
