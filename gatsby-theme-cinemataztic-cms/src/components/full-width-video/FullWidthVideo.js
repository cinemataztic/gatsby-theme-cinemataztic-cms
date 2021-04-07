/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 12-09-2019.
 */
import React, { useRef } from "react";
import Player from "./Player";
import get from 'lodash.get'
import { Waypoint } from "react-waypoint";
import { win } from "../../utils/browserMock";
import TweenMax from "gsap";

const FullWidthVideo = (props) => {

	const containerRef = useRef(null);

	const shortVideoUrl = get(props.data.fullWidthVideo, "publicURL", null)
	const largeVideoUrl = get(props.data, "largeVideoUrl", null)
	const showControls = props.data.showControls //&& !shortVideoUrl ? false : true
	const fluidCoverImage = get(props.data, "fullWidthVideoImage.childImageSharp.fluid", null)
	const autoPlay = props.data.autoplay //&& shortVideoUrl ? false : true;

	const videoUrl = shortVideoUrl ? shortVideoUrl : largeVideoUrl


	const onEnter = (value) => {
		if (value.previousPosition === "below" || value.previousPosition === undefined) {
			TweenMax.to(containerRef.current, 1.2, { y: 0, alpha: 1, ease: "Expo.easeOut" });
		}
	};

	const onLeave = (value) => {
		if (value.currentPosition === "below") {
			TweenMax.to(containerRef.current, 1, { y: 200, alpha: 0, ease: "Expo.easeOut" });
		}
	}


	return (

		<Waypoint bottomOffset='10%' onEnter={onEnter} onLeave={onLeave} scrollableAncestor={win} >
			<div ref={containerRef} className="row mt-5 mb-5" style={{ opacity: 0 }}>
				<div className="col-12 col-md-10 mx-auto">
					<div className="row" style={{}}>
						<div className="col-12 " style={{ minHeight: "25vh", }}>

							<Player url={videoUrl} showControls={showControls} fluidCoverImage={fluidCoverImage} autoPlay={autoPlay}></Player>
						</div>
					</div>
				</div>
			</div>
		</Waypoint>
	)

}
export default FullWidthVideo
