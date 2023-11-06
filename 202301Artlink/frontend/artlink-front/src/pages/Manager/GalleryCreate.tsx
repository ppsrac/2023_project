import { useState, ChangeEvent } from "react";
import BackBtn from "../../commponents/Base/BackBtn.tsx";
import TextBtn from "../../commponents/Base/TextBtn.tsx";
import { GalleryCreateReq, AddGallery } from "../../api/ManagerApi.tsx";
import Modal2 from "../../commponents/Base/Form/ExhibitionModal/Modal2.tsx";
import styles from "./GalleryCreate.module.css";
import Styles2 from "../../pages/Common/Mypage.module.css";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun.tsx";

function GalleryCreate() {
  // 전송할 폼데이터
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  const [galleryInfo, setGalleryInfo] = useState<GalleryCreateReq>({
    username: "",
    password: "",
    galleryName: "",
  });
  const [passID, setPassID] = useState(false);
  const [passPW, setPassPW] = useState(false);
  const [passName, setPassName] = useState(false);

  // 각 필드와 필드에 대한 이름을 매핑한 객체
  const fieldNames: Record<keyof GalleryCreateReq, string> = {
    username: "ID",
    password: "비밀번호",
    galleryName: "갤러리 이름",
  };

  // 생성 요청시
  const handleAdd = () => {
    console.log("creating");
    void callCreateWork();
  };

  // 생성 API
  const callCreateWork = async () => {
    try {
      if (!passID) {
        window.alert("아이디는 4글자 이상이어야 합니다. 다시 확인해주세요.");
        return;
      } else if (!passPW) {
        window.alert("비밀번호는 4글자 이상이어야 합니다. 다시 확인해주세요.");
        return;
      } else if (!passName) {
        window.alert(
          "갤러리 이름은 2글자 이상이어야 합니다. 다시 확인해주세요."
        );
        return;
      }

      setAuthorizationHeader();
      const response = await AddGallery(galleryInfo);
      console.log("갤러리 계정 생성:", response);
      setisModalActive(true);
    } catch (error) {
      console.error("갤러리 계정 생성 실패:", error);
    }
  };

  // 인풋값 변경시
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGalleryInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "username" && value.length >= 4) {
      setPassID(true);
    }
    if (name === "password" && value.length >= 4) {
      setPassPW(true);
    }
    if (name === "galleryName" && value.length >= 2) {
      setPassName(true);
    }
  };

  // 인풋 필드 자동 생성
  const renderFields = () => {
    return Object.keys(galleryInfo).map((field, index) => {
      return (
        <div key={index} className={styles["input-field"]}>
          <label htmlFor={field}>{fieldNames[field]} </label>
          <input
            type="text"
            id={field}
            name={field}
            placeholder={`${fieldNames[field]}을 입력하세요`}
            onChange={handleInputChange}
          />
        </div>
      );
    });
  };

  return (
    <>
      <Modal2 sendActive={isModalActive} />
      {/* 뒤로가기 & 페이지 설명 */}
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">{"갤러리 계정 생성"}</div>
      </div>
      {/* 계정 생성 바디 */}
      <div className={Styles2.MypagecontainerOutter}>
        <div className={Styles2.Mypagecontainer}>
          {/* 텍스트 */}
          <div className={styles["txt-box"]}>{renderFields()}</div>
        </div>
      </div>
      {/* 계정 생성 버튼 */}
      <div onClick={handleAdd}>
        <TextBtn inner="CREATE" wid={200} hei={50} />
      </div>
    </>
  );
}
export default GalleryCreate;
