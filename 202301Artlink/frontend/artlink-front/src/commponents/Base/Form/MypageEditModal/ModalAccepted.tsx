// 업데이트 성공 메세지

import { useState, useEffect } from "react";
import ModalBase from "../ModalBase";
import CardModal from "../CardModal";

interface ModalProps {
  sendActive: boolean;
}
export const Modal = ({ sendActive }: ModalProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(sendActive);
  }, [sendActive]);

  const onClickModalOff = () => {
    setIsActive(false);
    window.location.reload();
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
          title="승인"
          actionMsg="삭제"
          actionEvent={onClickCardRemove}
        >
          갤러리 승인에 성공했습니다.
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
