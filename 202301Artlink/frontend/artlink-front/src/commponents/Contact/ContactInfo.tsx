import { Link } from "react-router-dom";
import BackBtn from "../Base/BackBtn";
import Styles from "./ContactInfo.module.css";

function ContactInfo() {
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <BackBtn />
      </div>
      <div className={Styles.title2}>Contact Us</div>
      <div className={Styles.contactContainer}>
        <div className={Styles.contactContainer}>
          <div className={Styles.txt4}>
            ArtLink는 Team Accepted 202 에서 제공하는 원클릭 미술품 기록
            서비스입니다
          </div>
          <Link
            to="team"
            style={{
              textDecoration: "none",
              color: "black",
              marginBottom: "20px",
              fontSize: "12px",
            }}
          >
            <div>팀 정보로 이동 ⇀</div>
          </Link>
          <div className={Styles.txt5}>
            미술품을 관람하는 과정에서 몰입을 방해하는 사진촬영, 대화등을
            경험해보신 적이 있으신가요? 혹은 과거에 전시가 잘 떠오르지 않은
            경험이 있으신가요? 한 손으로 쉽게 휴대할 수 있는 ArtLink만의
            디바이스를 사용하여 전시 경험을 향상시켜보세요.
          </div>
        </div>
        <div className={Styles.contactBox}>
          <div className={Styles.contactSmallBoxOuter}>
            <div className={Styles.contactSmallBox}>
              <div style={{ margin: "auto" }}>
                <div className={Styles.txt6}>일반 사용자 문의</div>
                <div className={Styles.txt7}>whwnsgk830@gmail.com</div>
              </div>
            </div>
          </div>
          <div className={Styles.contactSmallBoxOuter}>
            <div className={Styles.contactSmallBox}>
              <div style={{ margin: "auto" }}>
                <div className={Styles.txt6}>갤러리 문의</div>
                <div className={Styles.txt7}>bjw0111@naver.com</div>
              </div>
            </div>
          </div>
          <div className={Styles.contactSmallBoxOuter}>
            <div className={Styles.contactSmallBox}>
              <div style={{ margin: "auto" }}>
                <div className={Styles.txt6}>버그 신고 및 기타건의</div>
                <div className={Styles.txt7}>ppsracchriskim@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ContactInfo;
