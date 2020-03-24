/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 09-09-2019.
 */
import React, { useEffect, useRef } from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import AniWrapper from "../buttons/AniWrapper";
import { win } from "../../utils/browserMock";
import ScrollListener from "react-scroll-listen";
import Logo from "../display/Logo";
import TweenMax from "gsap";
import { ReactComponent as LogoC } from "../../assets/new_logo.svg";

const NavItem = React.forwardRef(
  ({ title, urlPath, menuToggle, menuStatus }, ref) => {
    return (
      <div ref={ref} className="cine-nav-item pl-3 pr-3">
        <AniWrapper
          to={"/" + urlPath}
          menuToggle={menuToggle}
          menuStatus={menuStatus}
        >
          <p
            className="mb-0 font-weight-light text-capitalize"
            style={{ opacity: 0.9 }}
          >
            {" "}
            {title}
          </p>
        </AniWrapper>
      </div>
    );
  }
);

const DesktopNavigation = ({ menuData }) => {
  const logoRef = useRef();
  const containerRef = useRef();
  const ccRef = useRef();

  const myElements = [];
  let hasScroll = false;

  const items = menuData.edges
    .filter(item => {
      let noTitle = true;
      if (
        item.node &&
        item.node.navigation &&
        item.node.navigation.title &&
        item.node.navigation.title.length
      ) {
        noTitle = false;
      }
      let hidden = false;
      if (
        item.node &&
        item.node.navigation &&
        item.node.navigation.hide
      ) {
        hidden = item.node.navigation.hide;
      }
      return hidden || noTitle ? false : true;
    })
    .sort((a, b) => {
      const itemA = a.node.navigation.priority;
      const itemB = b.node.navigation.priority;
      return itemB - itemA;
    })
    .map((item, index) => {
    console.log("DesktopNavigation -> item, index", item, index)
      
      const title = item.node.navigation.title;
      const urlPath = item.node.slug;
      return (
        <NavItem
          key={index}
          ref={li => (myElements[index] = li)}
          title={title}
          urlPath={urlPath}
        ></NavItem>
      );
    });

  useEffect(() => {
    TweenMax.set(ccRef.current, {
      opacity: 0,
      rotation: "-90deg",
      transformOrigin: "50% 50%"
    });
    onScroll(window.scrollY);
  });

  const onScroll = v => {
    const value = v > 200 ? 200 : 0;

    TweenMax.to(logoRef.current, 0.5, { x: -value, ease: "Expo.easeOut" });

    if (value === 200 && !hasScroll) {
      hasScroll = true;
      TweenMax.to(ccRef.current, 0.5, {
        opacity: 1,
        rotation: 0,
        x: 0,
        ease: "Expo.easeOut"
      });

      TweenMax.to(containerRef.current, 0.5, {
        x: -70,
        opacity: 0,
        ease: "Expo.easeOut"
      });

      myElements.forEach((item, i) => {
        TweenMax.to(item, 0.5, {
          opacity: 0,
          y: -20,
          ease: "Expo.easeOut",
          delay: i / 40
        });
      });
    }

    if (value === 0 && hasScroll) {
      hasScroll = false;
      TweenMax.to(ccRef.current, 0.5, {
        opacity: 0,
        rotation: "-90deg",
        x: 30,
        ease: "Expo.easeOut"
      });

      TweenMax.to(containerRef.current, 0.5, {
        x: 0,
        opacity: 1,
        ease: "Expo.easeOut"
      });

      myElements.forEach((item, i) => {
        TweenMax.to(item, 0.5, {
          opacity: 1,
          y: 0,
          ease: "Expo.easeOut",
          delay: i / 20
        });
      });
    }
  };

  return (
    <div className="row d-lg-flex d-none  " style={{}}>
      <ScrollListener onScroll={onScroll} container={win} />

      <div className="col-12 ">
        <div className="row mt-4">
          <div className="col-1 d-flex justify-content-center" style={{}}>
            <div className="">
              <AniLink cover to={"/"} bg="#FFFFFF" direction="up">
                <div
                  ref={ccRef}
                  style={{ marginTop: -8, width: 40, height: 40 }}
                >
                  <LogoC></LogoC>
                </div>
              </AniLink>
            </div>
          </div>

          <div className="col-5 ">
            <div ref={containerRef} className="cine-nav-item logo">
              <AniLink cover to={"/"} bg="#FFFFFF" direction="up">
                <div
                  className="overflow-hidden position-relative"
                  style={{ height: 40, width: 200 }}
                >
                  <div
                    ref={logoRef}
                    className="w-100 position-absolute"
                    style={{ top: 0, left: 0 }}
                  >
                    <Logo></Logo>
                  </div>
                </div>
              </AniLink>
            </div>
          </div>

          <div className="col-5 d-flex justify-content-end ">
            <div className="d-flex flex-row justify-content-between">
              {items}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesktopNavigation;
