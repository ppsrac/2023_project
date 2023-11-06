// import React from "react";
import { Link } from "react-router-dom";
import "./PM.css";
import BackBtn from "../commponents/Base/BackBtn";

function PageManager() {
  const PM: Record<string, string> = {
    // Add more components and their URLs as needed...
    Home: "/home",
    Entrance: "/",
    Login: "/login",
    Signup: "/signup",
    LoginGallery: "/login-gallery",
    LoginAdmin: "/login-admin",
    SignupGallery: "/signup-gallery",
    Password: "/login/password",
    PasswordGallery: "/login-gallery/password",
    // User
    ArtMemory: "/art-memory",
    ArtMemoryDetail: "/art-memory/1",
    ArtMemoryEdit: "/art-memory/1/edit",
    ThreeTest: "/art-memory/1/3d",
    MypageUser: "/mypage/user",
    // Gallery
    ExhibitionBoard: "/exhibition-board",
    ExhibitionDetail: "/exhibition-board/1",
    WorksCreate: "/exhibition-board/1/create",
    WorksDetail: "/exhibition-board/1/1",
    IoTAdd: "/gallery/add-iot",
    IoTBoard: "/gallery/iot-board",
    MypageGallery: "/mypage/gallery",
    // Manager
    UserBoard: "/user-board",
    UserDetail: "/user-board/1", // Example with parameter (replace '1' with an actual ID)
    GalleryBoard: "/gallery-board",
    GalleryDetail: "/gallery-board/1", // Example with parameter (replace '1' with an actual ID)
    GalleryCreate: "/gallery-board/create",
    // Kiosk
    Kiosk: "/kiosk/home",
    KioskDetail: "/kiosk/1", // Example with parameter (replace '1' with an actual ID)
    KioskPrint: "/kiosk/print",
    KioskExit: "/kiosk/exit",
    ComponentTest: "/component-test", // Example with parameter (replace '1' with an actual ID)
    // Other
    Contact: "/contact",
    AboutUs: "/about",
    NotFound: "/not-found",
    // Only Developer
    ThreeTestPage: "/3d",
    ApiTest: "/api",
    ApiTest_Login: "/api_login",
    ApiTest_Signup: "/api_signup",
    ApiTest_UserInfo: "/api_userinfo",
    PageManage: "/PM",
  };

  const sections = {
    Entrance: [
      "Home",
      "Entrance",
      "Login",
      "Signup",
      "LoginGallery",
      "SignupGallery",
      "LoginAdmin",
      "Password",
      "PasswordGallery",
    ],
    User: ["ArtMemory", "ArtMemoryDetail", "ThreeTest", "MypageUser"],
    Gallery: [
      "ExhibitionBoard",
      "ExhibitionDetail",
      "WorksCreate",
      "WorksDetail",
      "IoTAdd",
      "IoTBoard",
      "MypageGallery",
    ],
    Manager: [
      "UserBoard",
      "UserDetail",
      "GalleryBoard",
      "GalleryDetail",
      "GalleryCreate",
    ],
    Kiosk: ["Kiosk", "KioskDetail", "KioskPrint", "KioskExit", "ComponentTest"],
    Other: ["Contact", "AboutUs", "NotFound", "ThreeTestPage"],
  };
  const needworkPages = ["Password", "PasswordGallery"];
  return (
    <>
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">{"PageManager"}</div>
      </div>
      <p>사용자별 권한 얻기</p>
      {/* 로그인 구현 */}
      <div>
        <button className="PMBtn">Login to User1</button>
        <button className="PMBtn">Login to Gallery1</button>
        <button className="PMBtn">Login to Admin1</button>
        <button className="PMBtn">LogOut</button>
      </div>
      {/* 각 기능 접근 */}
      <div className="PMContainer">
        {Object.entries(sections).map(([sectionName, componentList]) => (
          <div key={sectionName} className="PMSection">
            <h3>{sectionName}</h3>
            {componentList.map((componentName) => (
              <Link key={componentName} to={PM[componentName]}>
                <button className="PMBtn">{componentName}</button>
              </Link>
            ))}
          </div>
        ))}
      </div>
      {/* 작업 목록 노트 */}
      <div className="workContainer">
        <div className="workPage">
          <h2>작업 필요한 페이지</h2>
          <div className="workButtons">
            {needworkPages.map((componentName) => (
              <Link key={componentName} to={PM[componentName]}>
                <button className="PMBtn">{componentName}</button>
              </Link>
            ))}
          </div>
        </div>
        <div className="workOther">
          <h3>{`<기능수정>`}</h3>
          <div style={{ fontSize: "12px" }}>
            <p>마이페이지 전화번호 폼</p>
            <p>갤러리 생성 빈 상태로 가능한것 고치기</p>
            <p>리프레시 토큰 설정</p>
            <p>글자수 제한 관련 </p>
            <p>홈화면에 진입시 최상단으로 이동하게</p>
            <p>전시회 url 설정 필드 생성</p>
          </div>
          <h3>{`<디자인수정>`}</h3>
          <div style={{ fontSize: "12px" }}>
            <p>보드 디자인</p>
          </div>
          <h3>{`<ETC>`}</h3>
          <div style={{ fontSize: "12px" }}>
            <p>API 에러발생 처리 전부</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageManager;
