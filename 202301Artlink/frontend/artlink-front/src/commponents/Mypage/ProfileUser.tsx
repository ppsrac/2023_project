import { useState } from "react";
import ProfileUserApi from "./ProfileUserApi";
import { UserInfo, UserInfoEdit } from "../../api/UserApi";
import ProfileBox from "./ProfileBox";
import Modal from "../../commponents/Base/Form/MypageEditModal/Modal";
import Styles from "./Profile.module.css";
import Styles2 from "../../pages/Common/Mypage.module.css";
import TextBtn from './../Base/TextBtn';

// 화면에 보일 라벨링 이름
const labelMapping: Record<string, string> = {
  username: "아이디",
  nickname: "닉네임",
  phoneNumber: "핸드폰 번호",
};

function ProfileUser() {
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  const [isChange, setisChange] = useState<boolean>(false); // 변경요청 boolean
  const [userData, setUserData] = useState<UserInfo>({
    id: 0,
    username: "",
    phoneNumber: 0,
  });
  const [loading, setLoading] = useState<boolean>(true); // 유저정보 수신 boolean

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleUserInfoData = (data: UserInfo) => {
    setUserData(data);
    setLoading(false); // Data has been fetched, set loading to false
  };

  // input 필드의 값을 변경하여 userData를 업데이트하는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  // 변경버튼 눌렀을시
  const clickChnageBtn = () => {
    setisChange(true); // 이미지 업데이트 요청
    void updateUserinfo(); // 텍스트 업데이트
  };
  // 유저정보 업데이트 요청
  const updateUserinfo = async () => {
    try {
      const data = await UserInfoEdit(userData);
      console.log(data);
      setisModalActive(true);
    } catch (error) {
      console.error("Error UserInfoEdit:", error);
    }
  };

  return (
    <>
      <Modal sendActive={isModalActive} />
      <div className={Styles2.MypagecontainerUserOutter}>
      <div className={Styles2.MypagecontainerUser}>
      {loading ? ( // Show loading message if data is being fetched
        <>
          <h3>Loading...</h3>
          <p>The server is under maintenance. Please try again later.</p>
        </>
      ) : (
        
        <div className={Styles.MypageinnerBox}>
          {/* 왼쪽 박스 (프로필 이미지) */}
          <div className={Styles.infoOuterBoxLeft}>
              <ProfileBox isChanged={isChange} />
          </div>
          {/* 오른쪽 박스 (프로필 데이터) */}
          {userData && (
            <div className={Styles.infoOuterBoxRight}>
              <div className={Styles.infoInnerBoxRight}>
                {Object.keys(userData).map((key, index) => (
                  <div key={key} className={Styles.eachField}>
                  <div className={Styles.inputOrder} key={index}>
                    {labelMapping[key]}
                    <input
                      type="text"
                      name={key}
                      value={userData[key]}
                      onChange={handleInputChange}
                      disabled={key === "username" || key === "phoneNumber"} // 읽기 전용 설정
                      className={Styles.profileInput}
                    />
                  </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* 데이터조회 및 변경 api : 리턴값없음 */}
      </div>
      </div>
      <ProfileUserApi onUserDataChange={handleUserInfoData} />
      {/* 데이터 변경요청 */}
      {loading ? <div style={{padding:"30px"}}></div> : (
        <>
        <div style={{display:"flex", justifyContent:"center"}}>
          <div onClick={clickChnageBtn} >
            <TextBtn hei={45} wid={150} inner="Change" />
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default ProfileUser;
