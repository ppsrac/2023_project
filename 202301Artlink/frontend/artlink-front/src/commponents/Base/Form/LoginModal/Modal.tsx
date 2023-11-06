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
  };

  const onClickCardRemove = () => {
    alert("이벤트 실행");
  };

  return (
    <>
      <ModalBase active={isActive} closeEvent={onClickModalOff}>
        <CardModal
          closeEvent={onClickModalOff}
          title="로그인 오류"
          actionMsg="삭제"
          actionEvent={onClickCardRemove}
        >
          아이디 비밀번호를 확인하세요.
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
