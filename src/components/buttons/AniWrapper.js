/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 21-08-2019.
 */
import React from "react";
import TweenMax from 'gsap'
import TransitionLink from 'gatsby-plugin-transition-link'
import './ani-wrapper.scss'

const AniWrapper = (props) => {

	const exitDelay = props.exitDelay || 0;
	const classes = props.className || "trans-link";
	const activeClassName = props.activeClassName || "trans-link-active";

	const ani = (node, exit, exitDelay) => {

		if(props.menuStatus ){
			props.menuToggle(false)
			TweenMax.to(node ,.8, {alpha:0, y:0, delay:.2  , ease:"Expo.easeOut"});
			return
		}


		TweenMax.to(node ,.8, {alpha:0, scale:.9,scrollTop: 0,  ease:"Expo.easeOut"});
	};


	return (

	   <TransitionLink className={classes} activeClassName={activeClassName}

		  exit={{
			  length: .8,
			  trigger: ({ exit, node }) =>{
					console.log (" AniWrapper > click = " );
				  	return ani(node, exit, exitDelay)
			  }
		  }}

		  entry={{
			  delay: .5 ,

		  }}

		  to={props.to}
	   >

			{props.children}

	   </TransitionLink>
	)

}
export default AniWrapper
