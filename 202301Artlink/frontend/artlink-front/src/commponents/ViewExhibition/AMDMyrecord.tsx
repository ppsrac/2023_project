import { UserOneRecordRes } from "../../api/UserApi";
import "./AMDMyrecord.css";
import UpBtn from "../Base/UpBtn";
import artwork1 from "../../assets/artwork/artwork1.jpg";
import artwork2 from "../../assets/artwork/artwork2.jpg";
import artwork3 from "../../assets/artwork/artwork3.jpg";
import artwork4 from "../../assets/artwork/artwork4.png";
import artwork5 from "../../assets/artwork/artwork5.png";
import artwork6 from "../../assets/artwork/artwork6.png";

// import React from 'react';
interface AMDMyrecordProps {
  userData: UserOneRecordRes;
  isLeftVisible: boolean;
  isRightVisible: boolean;
}
function AMDMyrecord({
  userData,
  isLeftVisible,
  isRightVisible,
}: AMDMyrecordProps) {
  const scrollBoxClasses = `${
    window.innerWidth >= 767 && isLeftVisible && isRightVisible
      ? "scrollBox"
      : ""
  }`;
  const sampleWorks = [
    artwork1,
    artwork2,
    artwork3,
    artwork4,
    artwork5,
    artwork6,
  ];
  sampleWorks;
  return (
    <>
      <UpBtn howscroll={450} />
      {/* 나의 전시 여정을 보여줌 */}
      <div className="MyrecordBody">
        {/* 스크롤바 적용 div */}

        {/* 관람 기본 정보 */}
        <div>
          <hr />
        </div>
        <div
          className="infoBox"
          style={{
            fontSize: isLeftVisible ? "12px" : "12px",
          }}
        >
          <div
            className="infoTxt"
            style={{
              margin: isLeftVisible ? "2px" : "6px",
            }}
          >
            장소 : {userData.galleryName}
          </div>
          <div
            className="infoTxt"
            style={{
              margin: isLeftVisible ? "2px" : "6px",
            }}
          >
            전시회명 : {userData.exhibitionName}
          </div>
          <div
            className="infoTxt"
            style={{
              margin: isLeftVisible ? "2px" : "6px",
            }}
          >
            기록한 작품수 : {userData.workList.length}
          </div>
          <div
            className="infoTxt"
            style={{
              margin: isLeftVisible ? "2px" : "6px",
            }}
          >
            기록 일자 : {userData.visitDate}
          </div>
        </div>
        <div>
          <hr />
        </div>
        {/* 기록 전시 */}
        <div className={scrollBoxClasses}>
          {userData.workList.map((work, index) => (
            <div
              className={`recordWork ${
                isLeftVisible && window.innerWidth >= 767 ? "workScroll" : ""
              }`}
              key={index}
            >
              {userData.exhibitionID == 0 ? (
                <>
                  <img
                    src={sampleWorks[index]}
                    alt={work.paintName}
                    className="recordImg"
                    style={isLeftVisible ? {} : { width: "60%" }}
                  />
                </>
              ) : (
                <>
                  <img
                    src={work.paintPath}
                    alt={work.paintName}
                    className="recordImg"
                    style={isLeftVisible ? {} : { width: "60%" }}
                  />
                </>
              )}
              <div className="recordImgTitle">{work.paintName}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default AMDMyrecord;
