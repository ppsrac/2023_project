// 업데이트 성공 메세지

import { useState, useEffect } from "react";
import ModalBase from "../ModalBase";
import CardModal from "../CardModal";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  sendActive: boolean;
}
export const Modal = ({ sendActive }: ModalProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(sendActive);
  }, [sendActive]);
  const navigate = useNavigate();
  const onClickModalOff = () => {
    setIsActive(false);
    navigate(-1);
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
          title="업데이트"
          actionMsg="삭제"
          actionEvent={onClickCardRemove}
        >
          전시 정보 수정에 성공했습니다.
          <br />
          <br />
          <br />
          <br />
        </CardModal>
      </ModalBase>
    </>
  );
};

export default Modal;
