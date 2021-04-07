/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 17-09-2019.
 */
import React from "react";

const ExternalLink = ({ to, children }) => {
  return (
    <div>
      <a
        className="btn btn-primary  "
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}{" "}
      </a>
    </div>
  );
};
export default ExternalLink;
