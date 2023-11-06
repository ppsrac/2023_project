import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../Base/MainLogo";
import styles from "./HomeBase.module.css";

interface Props {
  firstLink: string;
  firstTitle: string;
  firstQuote: string;
  secondLink: string;
  secondTitle: string;
  secondQuote: string;
  accepted?: boolean;
}

function HomeBase({
  firstLink,
  firstTitle,
  firstQuote,
  secondLink,
  secondTitle,
  secondQuote,
  accepted = true,
}: Props) {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = (page: string) => {
    setShowAnimation(true);

    setTimeout(() => {
      // 애니메이션 작동 코드
      navigate(page);
    }, 500); // 1초 동안 애니메이션 표시
  };

  return (
    <>
      <div>
        <MainLogo />
      </div>
      <div className="BigBtnBox2">
        {/* Menu : Your Memory */}
        <div className={styles.startbtnBody}>
          <div
            className={`${styles.startbtnOuter} ${
              showAnimation ? styles.animateBtn : ""
            }`}
          >
            <div
              className={`${styles.startbtn} ${
                showAnimation ? styles.animateBtn2 : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={accepted ? () => handleClick(firstLink) : undefined}
            >
              <div style={{ margin: "auto" }}>
                <p
                  className={`${styles.innerIcon} ${
                    showAnimation ? styles.animateText2 : ""
                  }`}
                >
                  {firstTitle}
                </p>
                <p
                  className={`${styles.innerIcon2} ${
                    showAnimation ? styles.animateText2 : ""
                  }`}
                >
                  {firstQuote}
                </p>
                {!accepted && (
                  <p
                    style={{ color: "red" }}
                    className={`${styles.innerIcon2} ${
                      showAnimation ? styles.animateText2 : ""
                    }`}
                  >
                    {"Authorization required!"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Menu : My Page */}
        <div className={styles.startbtnBody}>
          <div
            className={`${styles.startbtnOuter} ${
              showAnimation ? styles.animateBtn : ""
            }`}
          >
            <div
              className={`${styles.startbtn} ${
                showAnimation ? styles.animateBtn2 : ""
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => handleClick(secondLink)}
            >
              <div style={{ margin: "auto" }}>
                <p
                  className={`${styles.innerIcon} ${
                    showAnimation ? styles.animateText2 : ""
                  }`}
                >
                  {secondTitle}
                </p>
                <p
                  className={`${styles.innerIcon2} ${
                    showAnimation ? styles.animateText2 : ""
                  }`}
                >
                  {secondQuote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeBase;
