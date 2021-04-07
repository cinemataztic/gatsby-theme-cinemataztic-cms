/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 09-09-2019.
 */
import React, { useEffect, useRef, useState } from "react";
import TweenMax from "gsap";
import AniWrapper from "../buttons/AniWrapper";

import { ReactComponent as Instagram } from "../../assets/social/instagram.svg";
import { ReactComponent as Facebook } from "../../assets/social/facebook.svg";
import { ReactComponent as LinkedIn } from "../../assets/social/linkedin.svg";
import ScrollListener from "react-scroll-listen";
import Divider from "../Divider";
import { win } from "../../utils/browserMock";
import { Match } from "@reach/router";

const MobileNavItem = React.forwardRef(
  ({ title, urlPath, menuToggle, menuStatus }, myRef) => {
    const dividerRef = useRef();
    useEffect(() => {
      if (dividerRef.current) {
        TweenMax.to(dividerRef.current, 0.5, {
          scaleX: menuStatus ? 1 : 0,
          alpha: menuStatus ? 1 : 0,
          delay: menuStatus ? 0.3 : 0,
          ease: "Expo.easeOut",
          transformOrigin: "0% 50%"
        });
      }
    }, [menuStatus]);

    return (
      <div ref={myRef} className="cine-nav-item mobile-nav-item m-2 ">
        <AniWrapper
          to={urlPath || "/"}
          menuToggle={menuToggle}
          menuStatus={menuStatus}
        >
          <div className="d-flex flex-row ">
            <Match path={urlPath || "/"}>
              {routerProps => {
                return (
                  <div>
                    {routerProps.match && (
                      <div ref={dividerRef} style={{ opacity: 0 }}>
                        <Divider
                          className="mb-0 mt-3 mr-4 "
                          color="white"
                          height={2}
                          width={100}
                        ></Divider>
                      </div>
                    )}
                  </div>
                );
              }}
            </Match>

            <h3 className="mb-0 text-uppercase text-capitalize"> {title}</h3>
          </div>
        </AniWrapper>
      </div>
    );
  }
);

const MobileNavigation = ({ menuData, meta, logo }) => {
  const mobileRef = useRef();
  const barOneRef = useRef();
  const barTwoRef = useRef();
  const barThreeRef = useRef();
  const logoRef = useRef();
  const { facebookLink, instagramLink, linkedinLink } = meta;
  const [menuOpen, setMenuOpen] = useState(false);
  const myElements = [];

  const menuClick = () => {
    menuToggle();
  };

  const menuToggle = value => {
    if (value) {
      setMenuOpen(value);
      return;
    }
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const v = menuOpen ? 1 : 0;
    let ypos = 0;

    if (!menuOpen) {
      ypos = 50;
    }

    TweenMax.to(mobileRef.current, 0.6, {
      autoAlpha: v,
      y: ypos,
      ease: "Expo.easeOut"
    });

    if (mobileRef.current) {
      if (!menuOpen) {
        const logoYpos = window.scrollY > 200 ? -100 : -window.scrollY;
        TweenMax.to(logoRef.current, 0.5, {
          y: logoYpos,
          ease: "Expo.easeOut"
        });

        TweenMax.to(barOneRef.current, 0.4, {
          rotation: "0deg",
          y: 0,
          ease: "Expo.easeOut"
        });
        TweenMax.to(barTwoRef.current, 0.2, {
          opacity: 1,
          x: 0,
          ease: "Expo.easeOut"
        });
        TweenMax.to(barThreeRef.current, 0.4, {
          rotation: "0deg",
          y: 0,
          ease: "Expo.easeOut"
        });
      } else {
        TweenMax.to(logoRef.current, 0.5, { y: 0, ease: "Expo.easeOut" });

        myElements.forEach((item, index) => {
          TweenMax.fromTo(
            item,
            0.5,
            { opacity: 0, y: 60, delay: index / 10, ease: "Expo.easeOut" },
            { opacity: 1, y: 0, delay: index / 35, ease: "Expo.easeOut" }
          );
        });

        TweenMax.to(barOneRef.current, 0.6, {
          rotation: "45deg",
          y: 7,
          ease: "Expo.easeOut"
        });
        TweenMax.to(barTwoRef.current, 0.3, {
          opacity: 0,
          x: -5,
          ease: "Expo.easeOut"
        });
        TweenMax.to(barThreeRef.current, 0.6, {
          rotation: "-45deg",
          y: -7,
          ease: "Expo.easeOut"
        });
      }
    }
  }, [menuOpen, myElements]);

  const lineHeight = 2;

  const mobileItems = menuData.edges
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
      if (item.node && item.node.navigation && item.node.navigation.hide) {
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
      const { title } = item.node.navigation;
      const urlPath = item.node.slug;
      return (
        <MobileNavItem
          ref={li => (myElements[index + 1] = li)}
          menuToggle={menuToggle}
          menuStatus={menuOpen}
          key={index}
          title={title}
          urlPath={urlPath}
        />
      );
    });

  mobileItems.unshift(
    <MobileNavItem
      ref={li => (myElements[0] = li)}
      menuToggle={menuToggle}
      menuStatus={menuOpen}
      key={"home"}
      title={"Home"}
      urlPath={""}
    ></MobileNavItem>
  );

  const onScroll = v => {
    const value = v > 101 ? -100 : -v;

    if (!menuOpen) {
      TweenMax.to(logoRef.current, 0.5, {
        y: value,
        opacity: 1,
        ease: "Expo.easeOut"
      });
    }
  };

  return (
    <div className="row d-lg-none">
      <ScrollListener onScroll={onScroll} container={win} />

      <div className="col-12 position-relative testing-mobile-nav">
        <div className="float-left mt-4 w-50">
          <div className="w-100 mobile-logo " style={{ height: 20 }}>
            <div
              ref={logoRef}
              className="w-100 position-relative"
              style={{ zIndex: 200 }}
            >
              <img style={{ maxHeight: 40, maxWidth: 200 }} alt="" src={logo.src} />
            </div>
          </div>
        </div>

        <div className="float-right mt-4">
          <div
            role="button"
            tabIndex="0"
            onKeyPress={e => e.preventDefault()}
            onClick={menuClick}
            className="d-flex flex-column justify-content-around mr-2 position-relative pointer no-outline"
            style={{ zIndex: 500, width: 30, height: 20 }}
          >
            <div
              ref={barOneRef}
              className="w-100"
              style={{ background: "white", height: lineHeight }}
            ></div>
            <div
              ref={barTwoRef}
              className="w-100"
              style={{ background: "white", height: lineHeight }}
            ></div>
            <div
              ref={barThreeRef}
              className="w-100"
              style={{ background: "white", height: lineHeight }}
            ></div>
          </div>
        </div>

        <div
          ref={mobileRef}
          className="vh-100 w-100 position-absolute "
          style={{
            top: 0,
            left: 0,
            background: "black",
            visibility: "hidden",
            opacity: 0
          }}
        >
          <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end  pr-4">
            {/*<Divider></Divider>*/}
            {mobileItems}
            {/*<Divider></Divider>*/}
            <div
              className="d-flex mt-4 justify-content-end align-items-end w-100 social"
              style={{ opacity: 0.7 }}
            >
              {instagramLink && (
                <div className="pointer">
                  <a
                    href={instagramLink}
                    alt="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </a>
                </div>
              )}

              {facebookLink && (
                <div className="pointer">
                  <a
                    href={facebookLink}
                    alt="facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </a>
                </div>
              )}

              {linkedinLink && (
                <div className="pointer">
                  <a
                    href={linkedinLink}
                    alt="linkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileNavigation;
