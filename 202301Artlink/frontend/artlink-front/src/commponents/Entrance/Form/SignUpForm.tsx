/* eslint-disable @typescript-eslint/no-misused-promises */
import "./Form.css";
import React, { useState } from "react";
import Modal from "../../Base/Form/SignupModal/Modal";
import {
  SignUpReq,
  signUpUserApi,
  signUpGalleryApi,
} from "../../../api/CommonApi";
import BackBtn from "../../Base/BackBtn";
import MarginTopInput from "../../EditCss/MaginTopInput";

function SignUpForm() {
  const [isActive, setisActive] = useState(false); // 모달창 띄울 때 사용
  const [passID, setPassID] = useState(false);
  const [passPW, setPassPW] = useState(false);
  const [passPWCheck, setPassPWCheck] = useState(false);
  const [passNickname, setPassNickname] = useState(false);
  const [passGalleryName, setPassGalleryName] = useState(false);
  // const [passPhone, setPassPhone] = useState(false); // 전화번호 조건 설정 필요

  // 폼 데이터
  const [formData, setFormData] = useState<SignUpReq>({
    username: "",
    password: "",
    phoneNumber: 0,
    nickname: "",
    galleryName: "",
  });

  const [passwordCheckMsg, setPasswordCheckMsg] = useState(""); // 입력값 일치 확인

  // 인풋 필드 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "username") {
      if (value.length >= 4) {
        setPassID(true);
      }
    } else if (name === "password") {
      if (value.length >= 4) {
        setPassPW(true);
      }
    } else if (showGalleryNameField && name === "galleryName") {
      if (value.length >= 2) {
        setPassGalleryName(true);
      }
    } else if (!showGalleryNameField && name === "nickname") {
      if (value.length >= 2) {
        setPassNickname(true);
      }
    }

    // else if (name === "phoneNumber") {
    //   if (value.length >= 2) {
    //     setPassPhone(true);
    //   }
    // }
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formData.password && value) {
      if (formData.password === value) {
        setPasswordCheckMsg("입력하신 값이 같습니다.");
        setPassPWCheck(true);
      } else {
        setPasswordCheckMsg("입력하신 값이 다릅니다.");
      }
    } else {
      // 입력값 없을 시 메세지 가림
      setPasswordCheckMsg("");
    }
  };

  // 가입자의 종류에 따른 필드 설정
  const showGalleryNameField = location.pathname === "/signup-gallery";

  // 회원가입 API 요청
  const reqSignup = async () => {
    try {
      if (!passID) {
        window.alert("ID는 4글자 이상이어야 합니다. 다시 확인해주세요.");
        return;
      } else if (!passPW) {
        window.alert("비밀번호는 4글자 이상이어야 합니다. 다시 확인해주세요.");
        return;
      } else if (!passPWCheck) {
        window.alert("비밀번호를 동일하게 입력하셨는지 다시 확인해주세요.");
        return;
      } else if (!showGalleryNameField && !passNickname) {
        window.alert("닉네임은 두 글자 이상이어야 합니다. 다시 확인해주세요.");
        return;
      } else if (showGalleryNameField && !passGalleryName) {
        window.alert(
          "갤러리 이름은 두 글자 이상이어야 합니다. 다시 확인해주세요."
        );
        return;
      }
      // else if (!passPhone) {
      //   window.alert("전화번호가 올바르지 않습니다. 다시 확인해주세요.");
      //   return;
      // }

      if (showGalleryNameField) {
        console.log("갤러리 회원가입 요청");
        const response = await signUpGalleryApi(formData);
        console.log(response);
        setisActive(true);
      } else if (!showGalleryNameField) {
        console.log("유저 회원가입 요청");
        // const numericPhoneNumber = String(formData.phoneNumber);
        const formattedPhoneNumber = Number(
          "82" + String(formData.phoneNumber)
        );
        const updatedFormData = {
          ...formData,
          phoneNumber: Number(formattedPhoneNumber),
        };
        const response = await signUpUserApi(updatedFormData);
        console.log(response);
        setisActive(true); // 성공 모달창
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    event.preventDefault();
    void reqSignup();
  };

  return (
    <>
      <BackBtn />
      <MarginTopInput value={20} />
      <p className="loginTitle">{"회원가입"}</p>
      <form className="box" onSubmit={handleSubmit}>
        <label>아이디</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter ID"
          className="input-box"
          onChange={handleChange}
          required
        />
        {/* 아이디 중복체크 */}
        <div className="idCheck">{}</div>
        <br />
        <label>비밀번호</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          className="input-box"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-box"
          onChange={handlePass}
          required
        />
        <br />
        {/* 패스워드 다를시 로직 */}
        <div className="passwordCheck">{passwordCheckMsg}</div>
        <br />
        {/* 닉네임 */}
        {!showGalleryNameField && (
          <>
            <label>닉네임</label>
            <br />
            <input
              type="nickname"
              name="nickname"
              id="nickname"
              placeholder="Enter nickname"
              className="input-box"
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>전화 번호</label>
            <br />
            <input
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              maxLength={11}
              placeholder="Enter phone number"
              className="input-box"
              onChange={handleChange}
              required
            />
          </>
        )}
        {/* 갤러리 이름 */}
        {showGalleryNameField && (
          <>
            <label>갤러리 이름</label>
            <br />
            <input
              type="galleryName"
              name="galleryName"
              id="galleryName"
              placeholder="Enter gallery name"
              className="input-box"
              onChange={handleChange}
              required
            />
          </>
        )}
        {/* 에러메세지 띄우기 */}
        <div className="errorMsg">{}</div>
        <MarginTopInput value={50} />
        <button type="submit" className="btn">
          <p>회원가입</p>
        </button>
        <Modal sendActive={isActive} />
      </form>
      <MarginTopInput value={40} />
    </>
  );
}
export default SignUpForm;
