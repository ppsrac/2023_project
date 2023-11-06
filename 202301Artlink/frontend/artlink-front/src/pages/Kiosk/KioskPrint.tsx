import { useEffect, useState } from "react";
import KioskMainLogo from "./KioskMainLogo";
import styles from "./KioskPrint.module.css";
import { useNavigate } from "react-router-dom";
import { fakePrint } from "../../api/KioskApi";

function KioskPrint() {
  const [recieved, setRecieved] = useState(false);
  const navigate = useNavigate();

  const print = async () => {
    try {
      const response = await fakePrint();
      setRecieved(true);
      console.log(response);
    } catch (error) {
      window.alert("프린트 성공");
      navigate("/kiosk/exit");
    }
  };

  useEffect(() => {
    void print();
  }, []);

  useEffect(() => {
    if (recieved) {
      setTimeout(() => navigate("/kiosk/exit"), 3);
    }
  }, [recieved, navigate]);

  return (
    <>
      <KioskMainLogo />
      <div className={styles["wrapper"]}>
        <div className={styles["loading-spinner"]}>
          <div className={styles["loading-spinner__ring"]}>
            <div className={styles["text"]}>Printing..</div>
            <div className={styles["loading-spinner__inner"]}></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default KioskPrint;
