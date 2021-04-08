import React from "react";

const Divider = React.forwardRef(
  (
    {
      height = 1,
      color = "#b5b5b5",
      width = "2rem",
      opacity = 1,
      className = "mt-4 mb-4"
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={` ${className} `}
        style={{
          background: color,
          width: width,
          height: height,
          opacity: opacity
        }}
      ></div>
    );
  }
);

export default Divider;
