import styles from "./DeleteModal.module.css";

// 키오스크에서 작품 삭제 시 뜨는 확인용 모달창

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void; // 값이 변경될 때 호출될 콜백 함수
}

function DeleteModal({ isOpen, onConfirm, onCancel }: Props) {
  const handleConfirm = () => {
    onConfirm();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["modal-back"]}>
      <div className={styles["modal-window"]}>
        <h4>{`해당 작품을 목록에서 삭제하시겠습니까?`}</h4>
        <div className={styles["button-wrapper"]}>
          <button className={styles["confirm-button"]} onClick={handleConfirm}>
            확인
          </button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
