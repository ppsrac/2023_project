import styles from "./InfoModal.module.css";

// 키오스크에서 작품 삭제 시 뜨는 확인용 모달창

interface Props {
  isOpen: boolean;
  title: string;
  image: string;
  onClose: () => void; // 값이 변경될 때 호출될 콜백 함수
}

function InfoModal({ isOpen, title, image, onClose }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["modal-back"]}>
      <div className={styles["modal-window"]}>
        <button onClick={onClose} className={styles.closeBtn}></button>
        <h2>{title}</h2>
        <img src={image} alt={title + " 이미지"} className={styles.imageBox} />
      </div>
    </div>
  );
}

export default InfoModal;
