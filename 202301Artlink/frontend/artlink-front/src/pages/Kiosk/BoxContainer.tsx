import styles from "./BoxContainer.module.css";
import ArtworkBox from "./ArtworkBox";
import { Paint } from "../../api/KioskApi";

// ArtworkBox를 담는 컨테이너

interface Props {
  chunk: Paint[];
  onClickDelete: (drawingId: number) => Promise<void>;
}

function BoxContainer({ chunk, onClickDelete }: Props) {
  return (
    <div className={styles.container}>
      {chunk.map((artwork, index) => (
        <ArtworkBox
          key={index}
          artwork={artwork}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  );
}

export default BoxContainer;
