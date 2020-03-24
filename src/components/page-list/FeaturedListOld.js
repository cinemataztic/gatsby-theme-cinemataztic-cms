/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 18-08-2019.
 */

import React, { useEffect, useState } from "react";
import Charming from "react-charming";
import { TestFade } from "../animation/FadingText";
import { Waypoint } from "react-waypoint";
import Slider from "./Slider";
import './featured-list.scss'
import validateLink from "../../utils/linkValidate";
import AniWrapper from "../buttons/AniWrapper";
import { withBreakpoints } from 'react-breakpoints'
import { win } from "../../utils/browserMock";



const getPos = (index) => {

	if(index === 0 ){
		return {top:-30, left:-40}
	}
	if(index === 1 ){
		return {bottom:-50, left:-30}
	}
	if(index === 2 ){
		return {top:-40, right:-40, textAlign:"right"}
	}

}


const getAmount = (breakpoints, currentBreakpoint) => {

	const currentBreak = breakpoints[currentBreakpoint]
	if(currentBreakpoint === "xs" ){
		return 1
	}
	if(currentBreakpoint === "md" ){
		return 3
	}
	return 4
};


const getPushDown = (value) => {
	if(value === 1 ){
		return "3rem"
	}
	if(value === 2 ){
		return "-2rem"
	}

	return "0rem"
}


const FeaturedList = (props) => {
	//console.log (" FeaturedList > data = " , props);

	console.log (" FeaturedList > props = " , props);

	const {breakpoints, currentBreakpoint} = props

	const data = props.data;
	const fakeArr = data.pageListArr.concat(data.pageListArr).concat(data.pageListArr)

	const itemAmount = getAmount(breakpoints, currentBreakpoint);


	return (


		<div className="row mb-5 mt-5 featured-list position-relative " style={{height:"80vh", zIndex:300}}>

			<div className="col-12 h-100 w-100 p-5 " >

				<Slider items={fakeArr}  width={Math.round(win.innerWidth/itemAmount)}  visible={itemAmount} style={{paddingLeft: 0, paddingRight:0, height:"100%" }}>

					{({node}, i) => {

						const {featuredContent , parentPage, urlPath, listImage } = node.frontmatter;

						const linkTo = validateLink(parentPage, urlPath )
						//const url = "url(" + featuredContent.featuredImage.publicURL + ")";
						//const rawUrl = featuredContent.featuredImage.publicURL;
						const rawUrl = listImage.childImageSharp.resolutions.src;

						const title =  featuredContent.title.split("@").join("\n")
						const description =  featuredContent.featuredDescription
						const pushDown = getPushDown((i % 3))

						const txtPos = getPos(i % 2)
						const colorOverlayClass = "image-overlay-" + (i % 2)


						return (

						<div key={i} className="w-100 h-100 d-flex justify-content-center  " style={{zIndex:300,  marginTop:pushDown }}>

							   <AniWrapper  to={linkTo} duration={.8} bg="#CCFF00"  >

								   <div className="position-relative " style={{zIndex:50, marginRight:"3rem",  userSelect:"none", userDrag: "none", boxShadow: "1.878px 3.532px 43px 0px rgba(0, 0, 0, .45)"}}>

									   <div className="w-100 position-absolute" style={{zIndex:10, ...txtPos}}>

										   <h2 className="display-4 text-uppercase font-weight-bold " style={{
											   fontSize:"calc(30px + (40 - 24) * ((100vw - 300px) / (1600 - 300)))",
											   zIndex:10,
											   userSelect: "none",
											   pointerEvents:"none",

										   }}>{title}</h2>
										   <p>{description}</p>
									   </div>


									   <div className={`w-100 h-100 position-absolute ${colorOverlayClass}`}  style={{top:0, left:0, zIndex:5, userSelect: "none",pointerEvents:"none"}}></div>
									   <img className="img-fluid position-relative " draggable="false" style={{zindex:1 ,userDrag: "none" ,userSelect:"none", pointerEvents:"none"}} src={rawUrl} alt=""/>
								   </div>
							   </AniWrapper>
						   </div>



					)}}
				</Slider>
			</div>
		</div>


	)

}

export default withBreakpoints(FeaturedList);



{/* <div className={`card text-white h-100 w-100 position-relative `}  style={{userSelect: "none", marginTop:pushDown}}>

							   <AniWrapper to={linkTo}>
							   <img src={rawUrl} className="mt-4 card-img " alt="" style={{marginLeft:"2rem", userSelect: "none", userDrag: "none", pointerEvents:"none"}}/>

								   <div className="card-img-overlay position-absolute" style={{zIndex:0, maxWidth:"60%", top:0, left:0, userSelect: "none"}}>
									   <h1 className="card-title text-uppercase font-weight-bold" style={{userSelect: "none"}}>THE COKE GAME</h1>
									   <p className="card-text" style={{userSelect: "none"}}>
										   This is a wider card with supporting text below
									   </p>

								   </div>
							   </AniWrapper>
						   </div>*/}
