import { useState, ChangeEvent, useRef } from "react";
import "./Detail.css";
import EmptyProfile from "../../assets/EmptyGallery.png";
import BackBtn from "../../commponents/Base/BackBtn.tsx";
import TextBtn from "../../commponents/Base/TextBtn.tsx";
import { Drawing, WorkCreate } from "../../api/GalleryApi.tsx";
import Modal2 from "../../commponents/Base/Form/ExhibitionModal/Modal2.tsx";
import TextareaAutosize from "react-textarea-autosize";

function WorksCreate() {
  // 전송할 폼데이터
  const formDataRef = useRef<FormData>(new FormData());
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  const [formData, setFormData] = useState<Drawing>({
    name: "",
    id: 0,
    drawingPath: "",
    description: "",
    artist: "",
    locationX: 0,
    locationY: 0,
  });
  // 각 필드와 필드에 대한 이름을 매핑한 객체
  const fieldNames: Record<keyof Drawing, string> = {
    name: "제목",
    id: "유저번호",
    description: "설명",
    artist: "작가",
    locationX: "위치 X",
    locationY: "위치 Y",
    drawingPath: "",
  };
  const [image, setImage] = useState<string | null>(null); // 이미지 관련
  // 생성 요청시
  const handleAdd = () => {
    console.log("creating");

    if (formDataRef.current.has("imageFile")) {
      for (const [key, value] of Object.entries(formData)) {
        if (key != "drawingPath" && key != "id") {
          formDataRef.current.append(key, value as string);
        }
      }
      void callCreateWork();
    } else {
      window.alert("Please Upload a Work image");
    }
  };
  // 생성 API
  const callCreateWork = async () => {
    try {
      const response = await WorkCreate(formDataRef.current);
      console.log("Work created:", response);
      setisModalActive(true);
    } catch (error) {
      console.error("Error creating exhibition:", error);
    }
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
      formDataRef.current.delete("imageFile");
      formDataRef.current.append("imageFile", file);
    }
  };
  // 인풋값 변경시
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 인풋 필드 자동 생성
  const renderFields = () => {
    return Object.keys(formData).map((field, index) => {
      if (field !== "drawingPath" && field !== "id") {
        // 이미지 필드는 제외
        return (
          <div key={index} className="input-field">
            <label htmlFor={field}>{fieldNames[field]}</label>
            <TextareaAutosize
              id={field}
              name={field}
              placeholder={`${fieldNames[field]}을 입력하세요`}
              onChange={handleInputChange}
              className="textArea2"
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Modal2 sendActive={isModalActive} />
      {/* 뒤로가기 & 페이지 설명 */}
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">작품 생성</div>
      </div>
      {/* 작품 생성 바디 */}
      <div className="detail-container-outter">
        <div className="detail-container">
          {/* 이미지 */}
          <div className="image-box2">
            <div>
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  style={{ width: "100%" }}
                  className="work-image2"
                />
              ) : (
                <img
                  src={EmptyProfile}
                  style={{ width: "100%" }}
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
          </div>
          {/* 텍스트 */}
          <div className="txt-box2" style={{ fontSize: "12px" }}>
            {renderFields()}
          </div>
        </div>
      </div>
      {/* 작품 생성 버튼 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div onClick={handleAdd}>
          <TextBtn inner="CREATE" wid={200} hei={50} />
        </div>
      </div>
    </>
  );
}
export default WorksCreate;
