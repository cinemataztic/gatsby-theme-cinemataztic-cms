/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 29-08-2019.
 */
import React from "react";
import { ReactComponent as ArrowSvg } from "../../assets/arrow.inline.svg";

const DownArrow = React.forwardRef(({arrowColor}, ref) => {
  return (
    <div
      ref={ref}
      className="rounded-circle mx-auto d-flex justify-content-center align-items-center position-relative"
      style={{
        zIndex: 100,
        marginTop: 60,
        width: 90,
        height: 90,
        background: arrowColor
      }}
    >
      <ArrowSvg
        className="my-arrow"
        style={{ width: 40, height: 40, fill: "white" }}
      />
    </div>
  );
});
export default DownArrow;
