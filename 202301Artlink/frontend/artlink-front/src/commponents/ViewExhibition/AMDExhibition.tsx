import { useState } from "react";
import Styles from "./AMD.module.css";
import poster from "../../assets/poster3.png";
import { UserOneRecordRes } from "../../api/UserApi";
import TextBtnFontsize from "../Base/TextBtnFontsize";
import { Link } from "react-router-dom";

interface AMDExhibitionProps {
  onButtonClick: () => void;
  galleryData: UserOneRecordRes;
  isRightVisible: boolean;
}
function AMDExhibition({
  onButtonClick,
  galleryData,
  isRightVisible,
}: AMDExhibitionProps) {
  const [isFrameEnabled, setIsFrameVisible] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const posterUrl = searchParams.get("posterUrl");
  const handleButtonClick = () => {
    setIsFrameVisible(!isFrameEnabled);
    onButtonClick();
  };
  const descript = galleryData.exhibitionName;
  console.log(descript);

  return (
    <>
      {/* 갤러리의 특정 전시회를 불러와서 정보를 보여줌 */}
      <p className={`${Styles.AMDTitleTxt}`}>{galleryData.exhibitionName}</p>
      <div
        className={`${isFrameEnabled ? Styles.AMDFrame : Styles.AMDFrameOn}`}
      >
        <div className={`${Styles.AMDimageBox}`}>
          {posterUrl ? (
            <>
              <img
                src={posterUrl}
                alt="전시회를 준비중입니다."
                className={`${Styles.AMDimage}`}
              />
            </>
          ) : (
            <>
              <img
                src={poster}
                alt="전시회를 준비중입니다."
                className={`${Styles.AMDimage}`}
              />
            </>
          )}
        </div>
        <div className={`${Styles.AMBRightBox}`}>
          <div
            className={`${Styles.AMDtxtBox} ${
              isRightVisible ? Styles.smallFontSize : Styles.largeFontSize
            }`}
          >
            <div className={Styles.descript}>
              {galleryData.exhibitionDescription}
            </div>
          </div>
          <div className={`${Styles.AMDbtnBox}`}>
            <Link
              style={{ width: "35%" }}
              to={
                galleryData.exhibitionUrl
                  ? galleryData.exhibitionUrl
                  : "/nothing"
              }
              target="_blank"
            >
              <div>
                <TextBtnFontsize
                  hei={"40px"}
                  wid={"100%"}
                  fontSize={12}
                  inner="About Page"
                />
              </div>
            </Link>
            <div style={{ width: "50%" }} onClick={handleButtonClick}>
              <TextBtnFontsize
                hei={"40px"}
                wid={"100%"}
                fontSize={12}
                inner={`Your Record ${isFrameEnabled ? "▶" : "◀"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AMDExhibition;
