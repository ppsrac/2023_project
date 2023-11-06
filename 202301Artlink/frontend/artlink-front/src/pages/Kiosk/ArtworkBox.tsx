import { useState } from "react";
import styles from "./ArtworkBox.module.css";
import DeleteModal from "./DeleteModal";
import InfoModal from "./InfoModal";
import { Paint } from "../../api/KioskApi";

// 작품의 정보를 띄울 박스, delete로 작품 삭제 가능

interface Props {
  artwork: Paint;
  onClickDelete: (drawingId: number) => Promise<void>;
}

function ArtworkBox({ artwork, onClickDelete }: Props) {
  // 정보 모달 창 오픈 여부 저장
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  // 삭제 모달 창 오픈 여부 저장
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 정보 모달창 열기
  const handleInfoModalOpen = () => {
    setIsInfoModalOpen(true);
  };

  // 정보 모달 창 닫기
  const handleInfoModalClose = () => {
    setIsInfoModalOpen(false);
  };

  // 삭제 모달창 열기
  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  // 삭제 모달 창 확인
  const handleDeleteModalConfirm = async () => {
    await onClickDelete(artwork.artworkId);
    setIsDeleteModalOpen(false);
  };

  // 삭제 모달 창 취소
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles["artwork-box"]}>
      <div
        className={`${styles.artworkOuter} ${styles.neu}`}
        onClick={handleInfoModalOpen}
      >
      <div
        className={`${styles.artwork} ${styles.neuInset}`}
        onClick={handleInfoModalOpen}
      >
        {/*작품의 정보가 들어갈 곳*/}
        <div className={styles.title}>{artwork.paintName}</div>
        <img src={artwork.paintPath} alt="작품 이미지" />
      </div>
        </div>
      <div className={styles["button-wrapper"]}>
        <button
          className={`${styles.neubtn} ${styles.delete}`}
          onClick={handleDeleteModalOpen}
        >
          Delete
        </button>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onConfirm={handleDeleteModalConfirm}
          onCancel={handleDeleteModalCancel}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          title={artwork.paintName}
          image={artwork.paintPath}
          onClose={handleInfoModalClose}
        />
      </div>
    </div>
  );
}

export default ArtworkBox;
