// import React from 'react';
import styles from "./ExhibitionTable.module.css";
import Mona from "../../assets/모나리자.jpg";
import Perl from "../../assets/진주귀걸이.jpg";
import Gogh from "../../assets/고흐.jpg";

// 관람한 전시회 목록에 띄워질 박스
// 전시회의 작품 목록이 썸네일로 쓰임.

/*
사진 서버에서 불러오는 코드
사진 최소 3개 정도는 필요할듯
*/

const year = 23;
const month = 7;
const day = 20;

// 내가 관람한 전시회를 보여줄 컴포넌트
// 클릭 시 전시회 세부 조회 페이지로 넘어간다.
function ExhibitionTable() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1>ExhibitionTable</h1>
          <div className={styles["img-wrapper"]}>
            <img src={Mona} alt="모나리자" />
            <img src={Perl} alt="진주귀걸이" />
            <img src={Gogh} alt="고흐" />
          </div>
        </div>
        <div className={styles.date}>
          Created:{year}.{month}.{day}
        </div>
      </div>
    </>
  );
}
export default ExhibitionTable;
