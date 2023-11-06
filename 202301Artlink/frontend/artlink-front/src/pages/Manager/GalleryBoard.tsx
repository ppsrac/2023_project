import "./style/Board.css";
import { useState, useEffect } from "react";
import { GalleryGet, GalleryGetRes } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoBoard from "../../commponents/Info/InfoBoard";

interface Data {
  [key: string]: string | number | boolean;
}

function GalleryBoard() {
  const [AllGalleryData, setAllGalleryData] = useState<Data[]>([]);
  useEffect(() => {
    const AllGallery = async () => {
      try {
        setAuthorizationHeader();
        const response: GalleryGetRes = await GalleryGet();
        setAllGalleryData(response.galleries);
      } catch (error) {
        console.error("갤러리 정보들을 가져오는 데 실패했습니다.", error);
        window.alert("갤러리 정보 가져오기 실패");
      }
    };
    void AllGallery();
  }, []);

  // 테이블 데이터
  // 허용여부(accepted)를 출력을 위해 "O","X"의 string 형태로 바꿔야함
  const galleryData = AllGalleryData.map((data) => ({
    ...data,
    accepted: data.accepted ? "O" : "X",
  }));
  const keys = ["아이디", "갤러리 이름", "허용여부", "설명문"]; // 데이터가 존재하지 않을 경우 오류가 발생하기 때문에 이 부분은 페이지 별로 하드코딩해야 함
  const widths = ["10%", "20%", "10%", "60%"];

  return (
    <>
      <div className="container">
        <InfoBoard
          title="갤러리 관리"
          data={galleryData}
          dataKeys={keys}
          columnWidths={widths}
          keyToExclude={["id"]}
          detailLink="galleryName"
        />
      </div>
    </>
  );
}
export default GalleryBoard;
