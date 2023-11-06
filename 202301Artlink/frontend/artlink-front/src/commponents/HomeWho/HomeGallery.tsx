import { GalleryInfo } from "../../api/GalleryApi";
import { setAuthorizationHeader } from "../Base/BaseFun";
import { useEffect, useState } from "react";
import HomeBase from "./HomeBase";

function HomeGallery() {
  const [accepted, setAccepted] = useState(true);

  const getGalleryAccepted = async () => {
    try {
      setAuthorizationHeader();
      const data = await GalleryInfo();
      setAccepted(data.accepted);
    } catch (error) {
      console.error("승인 여부 가져오기 실패: ", error);
    }
  };

  useEffect(() => {
    void getGalleryAccepted();
  }, []);

  return (
    <>
      <HomeBase
        firstLink="/exhibition-board"
        firstTitle="Artwork Manager"
        firstQuote="Register your work"
        secondLink="/mypage/gallery"
        secondTitle="My Page"
        secondQuote="Manage your gallery info"
        accepted={accepted}
      />
    </>
  );
}
export default HomeGallery;
