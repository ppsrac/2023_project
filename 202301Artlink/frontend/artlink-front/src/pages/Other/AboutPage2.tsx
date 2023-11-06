import "./AboutUs.css";
import aboutImg1 from "../../assets/About2-11.png";
import aboutImg2 from "../../assets/About2-22.png";
import aboutImg3 from "../../assets/About2-33.png";
import aboutImg4 from "../../assets/About2-44.png";
import aboutImg5 from "../../assets/About2-55.png";
import aboutImg6 from "../../assets/About2-66.png";

function AboutPage2() {
  return (
    <>
      <div className="imgOuter">
        <div className="horizontalscrollcontainer">
          <img src={aboutImg1} alt="" />
          <img src={aboutImg2} alt="" />
          <img src={aboutImg3} alt="" />
          <img src={aboutImg4} alt="" />
          <img src={aboutImg5} alt="" />
          <img src={aboutImg6} alt="" />
        </div>
      </div>
    </>
  );
}
export default AboutPage2;
