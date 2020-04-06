/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 09-10-2019.
 */
import React, { useRef } from "react";
import { useHover } from "react-use-gesture";
import TweenMax from "gsap";
import AniWrapper from "../buttons/AniWrapper";
import { getPagePreviewData } from '../../utils/helpers';

import './nextPrevLink.scss'

const NextPrevLink = ({ previousPage, nextPage }) => {

	let isFullWidth = true;

	const leftArrow = useRef();
	const rightArrow = useRef();


	const itemLeft = previousPage;
	const previewDataLeft = itemLeft ? getPagePreviewData(itemLeft) : null;
	const itemRight = nextPage;
	const previewDataRight = itemRight ? getPagePreviewData(itemRight) : null;

	if (itemRight && itemLeft) {
		isFullWidth = false;
	}

	const bindLeft = useHover(({ hovering }) => {
		TweenMax.to(leftArrow.current, .5, { x: hovering ? -20 : 0, ease: "Expo.easeOut" });
	});

	const bindRight = useHover(({ hovering }) => {
		TweenMax.to(rightArrow.current, .5, { x: hovering ? 20 : 0, ease: "Expo.easeOut" });
	});


	return (
		<div className="row page-component mt-5 next-prev-link" style={{}}>
			<div className="col-12 mt-5 col-md-10 mx-auto use-background mb-0" >
				<div className="row" >

					{
						itemLeft
						&& <div {...bindLeft()} className={`${isFullWidth ? "col-12" : "col-6"} pt-5 pb-5 d-flex justify-content-around align-items-center pointer`}>

							<AniWrapper className="d-flex justify-content-between align-items-md-center align-items-start flex-column flex-md-row h-100 w-100 text-decoration-none "
								to={itemLeft.slug}  >

								<div ref={leftArrow} className="pl-3 w-md-100 order-md-0 order-1" style={{ transform: "rotate(180deg)" }} >
									<svg width="60" height="18" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" ><path d="M44.102 4l-2.444-2.445.009-1.405 4.325 4.325-4.38 4.38.01-1.423L44.101 5H.002V4z" fillRule="evenodd"></path></svg>
								</div>

								<div className="d-flex flex-column text-right text-uppercase title-txt">
									<h3 className="pr-3"><b>{previewDataLeft.title}</b></h3>
									<p className="pr-3 d-none d-md-block">{previewDataLeft.description}</p>
								</div>
							</AniWrapper>
						</div>
					}


					{
						itemRight
						&& <div {...bindRight()} className={`${isFullWidth ? "col-12 d-flex justify-content-around align-items-center" : "col-6"} col-6 pt-5 pb-5 pointer`} style={{ background: "rgba(255,255 ,255 , .1)" }}>

							<AniWrapper className="d-flex justify-content-between  align-items-md-center align-items-start flex-md-row flex-column h-100 w-100 text-decoration-none"
								to={itemRight.slug}
							>

								<div className="d-flex flex-column text-uppercase ">
									<h3 className="pl-3"><b>{previewDataRight.title}</b></h3>
									<p className="pl-3 d-none d-md-block">{previewDataRight.description}</p>
								</div>

								<div ref={rightArrow} className="pl-3 position-relative" style={{ marginTop: 0, top: 3 }}>
									<svg width="60" height="18" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" ><path d="M44.102 4l-2.444-2.445.009-1.405 4.325 4.325-4.38 4.38.01-1.423L44.101 5H.002V4z" fillRule="evenodd"></path></svg>
								</div>
							</AniWrapper>
						</div>
					}

				</div>
			</div>
		</div>

	)

}
export default NextPrevLink
