import Styles from "./Exhibition.module.css";
import AddBtn from "../../commponents/Base/AddBtn";
import AllExhibitions from "../../commponents/GalleryExhibitions/AllExhibitions";

function ExhibitionBoard() {
  return (
    <>
      {/* 전시회 박스 */}
      <div className={Styles.Exhibition}>
        {/* 상단 메뉴 */}
        <div className={Styles.ExhibitionMenu}>
          <div className={Styles.ExhibitionTitle}>전시회 목록</div>
          <AddBtn linkTo="/exhibition-board/create" />
        </div>
        <hr style={{ width: "80vw" }} />
        {/* 메인 컨테이너 */}
        <div className={Styles.ExhibitionContainer}>
          {/* api 로드 */}
          <AllExhibitions />
        </div>
      </div>
    </>
  );
}
export default ExhibitionBoard;
