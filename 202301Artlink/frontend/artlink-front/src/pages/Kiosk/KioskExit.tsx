import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./KioskExit.module.css";
import KioskMainLogo from "./KioskMainLogo";

function KioskExit() {
  const [countdown, setCountdown] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/kiosk/home");
    }
  }, [countdown, navigate]);

  return (
    <>
      <KioskMainLogo />
      <div className={styles["notice-container"]}>
        <div className={styles["notice-box-outer"]}>
          <div className={styles["notice-box"]}>
            <div className={styles["notice-text"]}>{"Good Bye"}</div>
          </div>
        </div>
        <div className={styles["notice-counter"]}>
          {countdown}초 후 홈으로 돌아갑니다.
        </div>
      </div>
    </>
  );
}
export default KioskExit;
