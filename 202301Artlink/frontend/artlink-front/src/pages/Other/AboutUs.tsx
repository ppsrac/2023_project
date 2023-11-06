import { useRef, useEffect, useState } from "react";
import "./AboutUs.css";
import Dots from "./AboutDot";
import UpBtn from "../../commponents/Base/UpBtn";
// pages
import AboutPage1 from "./AboutPage1";
import AboutPage2 from "./AboutPage2";
import AboutPage3 from "./AboutPage3";

function AboutUs() {
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState<number>(1); // State type specified for scrollIndex

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current!;

      const pageHeight = window.innerHeight * 0.8;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop + 1 < pageHeight) {
          console.log("현재 1페이지, down", scrollTop, pageHeight);
          setScrollIndex(2);
          outerDivRef.current!.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop + 1 < pageHeight * 2) {
          console.log("현재 2페이지, down", scrollTop, pageHeight);
          setScrollIndex(3);
          outerDivRef.current!.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          console.log("현재 3페이지, down", scrollTop, pageHeight);
          setScrollIndex(3);
          outerDivRef.current!.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("현재 1페이지, up");
          setScrollIndex(1);
          outerDivRef.current!.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (
          Number(scrollTop) + 1 >= pageHeight &&
          Number(scrollTop) + 1 < pageHeight * 2
        ) {
          console.log("현재 2페이지, up", scrollTop, pageHeight * 2);
          setScrollIndex(1);
          outerDivRef.current!.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          console.log("현재 3페이지, up");
          setScrollIndex(2);
          outerDivRef.current!.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    }

    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, []);

  return (
    <>
      <div className="aboutBody">
        <div ref={outerDivRef} className="outer">
          <Dots scrollIndex={scrollIndex} />
          <div className="inner">
            <AboutPage1 />
          </div>
          <div className="inner">
            <AboutPage2 />
          </div>
          <div className="inner">
            <AboutPage3 />
          </div>
        </div>
      </div>
      <div className="aboutBodyMobile">
        <div className="inner">
          <AboutPage1 />
        </div>
        <div className="inner">
          <AboutPage2 />
        </div>
        <div className="inner">
          <AboutPage3 />
        </div>
      </div>
      <UpBtn howscroll={100} />
    </>
  );
}

export default AboutUs;
