import BackBtn from "../../commponents/Base/BackBtn";
import UpdateExhibition from "../../commponents/GalleryExhibitions/UpdateExhibition";
import Styles from "./Exhibition.module.css";

function ExhibitionUpdate() {
  return (
    <>
      {/* 전시회 박스 */}
      <div className={Styles.Create}>
        {/* 상단 메뉴 */}
        <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">전시회 정보</div>
      </div>
        {/* <hr style={{ width: "80vw" }} /> */}
        {/* 메인 컨테이너 */}
        <div className={Styles.CreateContainer}>
          <UpdateExhibition />
        </div>
      </div>
    </>
  );
}
export default ExhibitionUpdate;
