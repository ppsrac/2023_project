import { useEffect, useState } from "react";
import { AllWorks, AllWorksRes } from "../../api/GalleryApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoBoard from "../../commponents/Info/InfoBoard";

interface Data {
  [key: string]: string | number;
}

function WorksBoard() {
  const [works, setWorks] = useState<Data[]>([]);
  useEffect(() => {
    const fetchAllworks = async () => {
      try {
        setAuthorizationHeader();
        const response: AllWorksRes = await AllWorks();
        console.log("전체 작품 목록: ", response);
        setWorks(response.DrawingList);
      } catch (error) {
        console.error("전체 작품 목록을 가져오는 데 실패했습니다.", error);
        window.alert("작품 목록을 가져오는 데 실패했습니다");
      }
    };
    void fetchAllworks();
  }, []);

  const keys = ["제목", "아티스트", "설명"];
  const widths = ["30%", "25%", "30%"];
  const keyToExclude = ["id", "drawingPath", "locationX", "locationY"];
  const params = new URLSearchParams(location.search);
  const exhibitionName = params.get("exhibitionName");

  return (
    <>
      {exhibitionName && (
        <InfoBoard
          title={exhibitionName}
          data={works}
          dataKeys={keys}
          columnWidths={widths}
          keyToExclude={keyToExclude}
          exhibition={true}
          detailLink="name"
        />
      )}
    </>
  );
}
export default WorksBoard;
