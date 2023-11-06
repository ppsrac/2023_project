import { useEffect, useState } from "react";
import Styles from "./ArtMemoryDetail.module.css";
import Styles2 from "../../commponents/ViewExhibition/AMD.module.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMDExhibition from "../../commponents/ViewExhibition/AMDExhibition";
import AMDMyrecord from "../../commponents/ViewExhibition/AMDMyrecord";
import BackBtn from "../../commponents/Base/BackBtn";
import { useLocation } from "react-router-dom";
import { UserOneRecord, UserOneRecordRes } from "../../api/UserApi";
import TextBtnFontsize from "../../commponents/Base/TextBtnFontsize";

const defaultMemory = {
  exhibitionID: 0,
  exhibitionUrl: "https://www.mmca.go.kr/exhibitions/progressList.do",
  exhibitionName: "릴레이 퍼포먼스",
  exhibitionDescription:
    "«국립현대미술관 청주 다원예술 2023 릴레이 퍼포먼스»는 개관 5주년을 맞이하는 국립현대미술관 청주에서 처음으로 시도하는 퍼포먼스 프로그램이다. ‘전문가와 비전문가’, ‘주류예술과 비주류예술’, ‘전시와 연계(부대) 교육’ 등은 모두 미술관 속 이분법적 구별과 위계 구조가 만들어낸 사회적 구분이다. 이는 다양성을 인정하고 소수의 공동체까지 포용해야 할 동시대 미술관의 순기능에 오작동을 일으키는 주요한 원인이기도 하다. 특히, 국립현대미술관 청주는 소장품의 수장과 관리, 보존의 기능을 특화한 미술관으로, 대중에게는 노출되지 않는 비공개 영역과 비가시적 활동을 관람객과 지속해서 공유하는 것을 목표로 한다. 따라서 본 프로그램은 열린 가치와 소통 능력, 유연함과 지속가능성을 품는 퍼포먼스 예술의 속성에 주목하는 동시에 국립현대미술관 청주, 나아가 오늘날 미술관의 공공적 역할을 비판적으로 관찰하고 성찰하려는 노력을 담고자 했다.",
  galleryID: 0,
  galleryName: "국립현대미술관",
  visitDate: "2023-08-02",
  workList: [
    { paintName: "작품1", paintPath: "/src/assets/artwork/artwork1.jpg" },
    { paintName: "작품2", paintPath: "/src/assets/artwork/artwork2.jpg" },
    { paintName: "작품3", paintPath: "/src/assets/artwork/artwork3.jpg" },
    { paintName: "작품4", paintPath: "/src/assets/artwork/artwork4.png" },
    { paintName: "작품5", paintPath: "/src/assets/artwork/artwork5.png" },
    { paintName: "작품6", paintPath: "/src/assets/artwork/artwork6.png" },
  ],
};
function ArtMemoryDetail() {
  const location = useLocation();
  const [memoryData, setMemoryData] = useState<UserOneRecordRes>(defaultMemory);
  const [isLeftVisible, setIsLeftVisible] = useState(true); // State variable for left div visibility
  const [isRightVisible, setIsRightVisible] = useState(false); // State variable for right div visibility
  const [isMobile, setIsMobile] = useState(true);

  const toggleVisibility = () => {
    setIsRightVisible(!isRightVisible);
  };

  const toggleVisibilityR = () => {
    setIsLeftVisible(!isLeftVisible);
  };
  // userKey로 데이터 조회
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pk = searchParams.get("userKey");
    console.log(pk);
    const fetchMemory = async () => {
      if (pk) {
        const fetchedExhibitions = await UserOneRecord(pk);
        console.log(fetchedExhibitions);
        setMemoryData(fetchedExhibitions);
      }
    };
    void fetchMemory();
  }, []);
  // 모바일 확인여부
  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    // 창 크기가 변경될 때마다 handleResize 함수 호출
    window.addEventListener("resize", handleResize);
    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">전시 기록 살펴보기</div>
      </div>
      <MarginTopInput value={10} />
      <div
        className={Styles["artmemory-container-outter"]}
        style={{
          width: isRightVisible ? (isLeftVisible ? "80vw" : "40vw") : "40vw",
          minWidth: isRightVisible ? (isMobile ? "500px" : "500px") : "500px",
          maxWidth: isRightVisible
            ? isLeftVisible
              ? "900px"
              : "600px"
            : "600px",
        }}
      >
        <div
          className={Styles["artmemory-container"]}
          style={{
            width: isRightVisible ? "80vw" : "40vw",
            minWidth: isRightVisible ? (isMobile ? "500px" : "500px") : "500px",
          }}
        >
          {/* Left div with the button */}
          <div
            className={`${Styles.artdetailLeft}`}
            style={{
              width: isLeftVisible ? "100%" : "100%",
              display: isLeftVisible ? "flex" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "SUITE-Regular",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <AMDExhibition
                onButtonClick={toggleVisibility}
                galleryData={memoryData}
                isRightVisible={isRightVisible}
              />
            </div>
          </div>

          {/* Right div */}
          <div
            className={`${
              isLeftVisible ? Styles.artdetailRight3 : Styles.artdetailRight2
            }`}
            style={{
              display: isRightVisible
                ? isLeftVisible
                  ? isMobile
                    ? "block"
                    : "flex"
                  : "block"
                : "none",
            }}
          >
            <div
              className={`${
                isLeftVisible ? Styles.artdetailRight : Styles.artdetailRight2
              }`}
              style={{
                display: isRightVisible
                  ? isLeftVisible
                    ? isMobile
                      ? "block"
                      : "flex"
                    : "block"
                  : "none",
              }}
            >
              <div
                className={`${
                  isLeftVisible ? Styles.artdetailRight : Styles.artdetailRight2
                }`}
                style={{
                  display: isRightVisible
                    ? isLeftVisible
                      ? isMobile
                        ? "block"
                        : "flex"
                      : "block"
                    : "none",
                }}
              >
                {/* 상단바 */}
                <div className={`${Styles.MyrecordHead}`}>
                  {" "}
                  <p
                    className={`${Styles2.AMDTitleTxt}`}
                    style={{
                      fontSize: isLeftVisible ? "13px" : "16px",
                      justifyContent: isLeftVisible ? "center" : "center",
                      border: "none",
                    }}
                  >
                    당신의 전시여정
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{ width: "35%" }}
                      onClick={() => {
                        window.location.href = "/3d";
                      }}
                    >
                      <TextBtnFontsize
                        fontSize={12}
                        hei={"30px"}
                        wid={"100%"}
                        inner="3D 보기"
                      />
                    </div>
                    <div style={{ width: "35%" }} onClick={toggleVisibilityR}>
                      <TextBtnFontsize
                        fontSize={12}
                        hei={"30px"}
                        wid={"100%"}
                        inner="확대/축소"
                      />
                    </div>
                  </div>
                </div>
                {/* 본내용 */}
                <AMDMyrecord
                  userData={memoryData}
                  isLeftVisible={isLeftVisible}
                  isRightVisible={isRightVisible}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarginTopInput value={100} />
    </>
  );
}

export default ArtMemoryDetail;
