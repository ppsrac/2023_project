import ProfileUser from "../../commponents/Mypage/ProfileUser";
import ProfileGallery from "../../commponents/Mypage/ProfileGallery";
import BackBtn from "../../commponents/Base/BackBtn";

function Mypage() {
  // 로그인한 사용자 권한 확인후 렌더링
  const pathname = window.location.pathname;
  return (
    <>
      {/* 프로필 페이지 */}
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">
          {pathname.includes("user") ? "유저 정보" : "갤러리 정보"}
        </div>
      </div>
      {pathname.includes("user") ? <ProfileUser /> : <ProfileGallery />}
    </>
  );
}
export default Mypage;
