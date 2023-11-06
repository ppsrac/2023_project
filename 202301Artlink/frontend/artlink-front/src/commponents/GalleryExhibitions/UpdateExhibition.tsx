import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ExhibitionOneInfo,
  ExhibitionOneInfoRes,
  ExhibitionUpdate,
  ExhibitionPosterUpdate,
} from "../../api/GalleryApi";
import TextBtn from "../Base/TextBtn";
import Styles from "./UpdateExhibition.module.css";
import ModalUpdate from "../Base/Form/ExhibitionModal/ModalUpdate";
Styles;
import TextareaAutosize from "react-textarea-autosize";

function UpdateExhibition() {
  const [image, setImage] = useState<string>(""); // 이미지 관련
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  const formDataRef = useRef<FormData>(new FormData());
  const [exhibitionInfo, setExhibitionInfo] = useState<ExhibitionOneInfoRes>({
    id: 0,
    exhibitionName: "",
    exhibitionExplanation: "",
    posterUrl: "",
    createdAt: "",
  });
  const initialFields = [
    { name: "exhibitionName", placeholder: "전시회 이름" },
    { name: "exhibitionExplanation", placeholder: "전시회 설명" },
  ];
  // 전시 상세 조회 API
  useEffect(() => {
    const fetchExhibitions = async () => {
      const fetchedExhibitions = await ExhibitionOneInfo();
      console.log(fetchedExhibitions);
      setExhibitionInfo(fetchedExhibitions);
      setImage(fetchedExhibitions.posterUrl);
    };

    void fetchExhibitions();
  }, []);
  // 인풋필드 변경시 저장
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setExhibitionInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
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
  // 이미지 수정 API
  const updateExhibition = async () => {
    try {
      const sendData = {
        exhibitionName: exhibitionInfo.exhibitionName,
        exhibitionExplanation: exhibitionInfo.exhibitionExplanation,
      };
      const data = await ExhibitionUpdate(sendData);
      console.log("Update Exhibition :", data);
      return data;
    } catch (error) {
      console.error("Error ExhibitionUpdate:", error);
      throw error;
    }
  };
  // 전시 정보 수정 API
  const updateExhibitionPoster = async () => {
    try {
      const data = await ExhibitionPosterUpdate(formDataRef.current);
      console.log("Update poster to Exhibition :", data);
    } catch (error) {
      console.error("Error ExhibitionPosterUpdate:", error);
    }
  };
  // 업데이트 버튼 누를시
  const handelUpdate = async () => {
    try {
      await updateExhibition(); // Exhibition 업데이트 함수 호출
      await updateExhibitionPoster(); // Poster 업데이트 함수 호출
      setisModalActive(true); // 모달 활성화
    } catch (error) {
      console.error("Error in handelUpdate:", error);
      window.alert("입력값이 잘못되었습니다. 확인해주세요");
    }
  };
  return (
    <>
      <ModalUpdate sendActive={isModalActive} />
      {/* 전시회 생성 */}
      <div className={Styles.ExhibitionInfooutter}>
        <div className={Styles.ExhibitionInfo}>
          {/* 이미지 박스 */}
          <div className={Styles.imagebox}>
            <div className={Styles.imageInnerBox}>
              {image ? (
                <img src={image} alt="Profile" className={Styles.workImage} />
              ) : (
                <img src={image} alt="빈 프로필" className={Styles.workImage} />
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
          </div>
          {/* 텍스트 박스 */}
          <div className={Styles.ExhibitionTxt}>
            {initialFields.map((field) => (
              <div className={Styles.ExhibitionInputContainer} key={field.name}>
                <p>{field.placeholder} </p>
                <TextareaAutosize
                  name={field.name}
                  value={exhibitionInfo[field.name] as string}
                  onChange={handleInputChange}
                  className={Styles.ExhibitionInput}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 생성 전송 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <div onClick={handelUpdate}>
          <TextBtn inner={"Update"} wid={200} hei={50} />
        </div>
      </div>
    </>
  );
}
export default UpdateExhibition;
