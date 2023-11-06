import { useState, ChangeEvent, useEffect, useRef } from "react";
import EmptyProfile from "../../assets/EmptyGallery.png";
import {
  ExhibitionPosterAdd,
  ExhibitionCreateReq,
  ExhibitionCreate,
} from "../../api/GalleryApi";
import Modal from "../Base/Form/ExhibitionModal/Modal";
import Styles from "../GalleryExhibitions/UpdateExhibition.module.css";

// 프로필 박스의 부모노드에서 변경요청 변수
interface PBprops {
  isChanged: boolean;
  exhibitionInfo: ExhibitionCreateReq;
  handleSetisChange: () => void;
}

const ProfileBox: React.FC<PBprops> = ({
  isChanged,
  exhibitionInfo,
  handleSetisChange,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const formDataRef = useRef<FormData>(new FormData());
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean

  // 이미지 변경시
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      // 폼데이터에 파일 저장
      formDataRef.current.delete("posterFile");
      formDataRef.current.append("posterFile", file);
      formDataRef.current.append("posterName", "poster");
    }
  };

  // 부모노드에서 변경요청 감지
  useEffect(() => {
    if (isChanged) {
      void changeImage();
    }
  }, [isChanged]);

  // 변경 요청 감지시 실행할 함수들
  const changeImage = async () => {
    try {
      if (formDataRef.current.has("posterFile")) {
        console.log("Poster Add & Exhibition Create");
        const createData = await createExhibition();
        const pk = createData.id;
        await updateExhibitionPoster(pk);
        setisModalActive(true);
        return;
      } else {
        handleSetisChange();
        window.alert("Please Add Poster Image");
      }
    } catch (error) {
      console.error("Poster Add & Exhibition Create:", error);
      window.alert("전시회 생성에 실패했습니다. 관리자에게 문의하세요");
    }
  };

  // 전시회 생성 API
  const createExhibition = async () => {
    try {
      const data = await ExhibitionCreate(exhibitionInfo);
      console.log("Create Exhibition :", data);
      return data;
    } catch (error) {
      console.error("Error ExhibitionCreate:", error);
      throw error;
    }
  };
  // 포스터 등록 API
  const updateExhibitionPoster = async (exhibitionId: number) => {
    try {
      const data = await ExhibitionPosterAdd(formDataRef.current, exhibitionId);
      console.log("Add poster to Exhibition :", data);
    } catch (error) {
      console.error("Error ExhibitionPosterAdd:", error);
    }
  };

  return (
    <>
      <Modal sendActive={isModalActive} />
      <div className={Styles.imageInnerBox}>
        {image ? (
          <img src={image} alt="Profile" className={Styles.workImage} />
        ) : (
          <img
            src={EmptyProfile}
            style={{
              width: "100%",
              maxWidth: "200px",
              boxShadow: "none",
              border: "none",
            }}
            alt="빈 프로필"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        id="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <label htmlFor="file" style={{ fontSize: "12px" }}>
        파일 업로드
      </label>
    </>
  );
};

export default ProfileBox;
