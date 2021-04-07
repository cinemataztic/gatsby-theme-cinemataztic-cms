/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 23-07-2019.
 */
import React from "react";

const FullWidthText = (props) => {

  const {title, text } = props.data

	return (
			<div className="row" style={{}}>
				<div className="col-12 text-center">

          <h1>{title}</h1>

				</div>
        <div className="col-12 text-center">
          <p>{text}</p>
        </div>
			</div>
	)

}
export default FullWidthText
