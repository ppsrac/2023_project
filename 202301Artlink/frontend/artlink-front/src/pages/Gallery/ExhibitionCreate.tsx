import Styles from "./Exhibition.module.css";
import BackBtn from "../../commponents/Base/BackBtn";
import CreateExhibition from "../../commponents/GalleryExhibitions/CreateExhibition";

function ExhibitionCreate() {
  return (
    <>
      {/* 전시회 박스 */}
      <div className={Styles.Create}>
        {/* 상단 메뉴 */}
        <div className="worksBackBtn">
          <BackBtn />
          <div className="workTitle">전시회 생성</div>
        </div>
        <div className={Styles.CreateContainer}>
          <CreateExhibition />
        </div>
      </div>
    </>
  );
}
export default ExhibitionCreate;
