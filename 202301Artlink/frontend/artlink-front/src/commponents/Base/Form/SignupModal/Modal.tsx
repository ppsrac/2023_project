import { useState, useEffect } from "react";
import ModalBase from "../ModalBase";
import CardModal from "../CardModal";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  sendActive: boolean;
}
export const Modal = ({ sendActive }: ModalProps) => {
  const [isActive, setIsActive] = useState(false);
  const showGalleryNameField = location.pathname === "/signup-gallery";
  useEffect(() => {
    setIsActive(sendActive);
  }, [sendActive]);
  const navigate = useNavigate();

  const onClickModalOff = () => {
    setIsActive(false);
    if (showGalleryNameField) {
      navigate("/login-gallery");
    } else if (!showGalleryNameField) {
      navigate("/login");
    }
  };

  const onClickCardRemove = () => {
    alert("이벤트 실행");
  };

  return (
    <>
      {/* <button onClick={onClickModalOn}>모달창 띄우기 버튼</button> */}
      <ModalBase active={isActive} closeEvent={onClickModalOff}>
        <CardModal
          closeEvent={onClickModalOff}
          title="회원가입"
          actionMsg="삭제"
          actionEvent={onClickCardRemove}
        >
          회원가입에 성공하셨습니다.
          <br />
          로그인 페이지로 이동합니다.
          <br />
          <br />
          <br />
        </CardModal>
      </ModalBase>
    </>
  );
};

export default Modal;
