/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 20-08-2019.
 */
import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Button = ({ to, children, block, type = "primary" }) => {
  // to is the actual pageLink node
  const asBtnBlock = block ? "btn-block" : "";
  const path = to && to.slug ? to.slug : "";
  return (
    <AniLink cover to={path} direction="up" duration={0.8} bg="#323232">
      <button className={`btn  btn-${type} ${asBtnBlock}`}>{children}</button>
    </AniLink>
  );
};
export default Button;
