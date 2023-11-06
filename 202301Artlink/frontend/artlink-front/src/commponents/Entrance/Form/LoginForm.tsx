import React, { useState, useEffect } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import { useLogIn } from "./LoginFormFunction";
import { LoginFormVar } from "./LoginFormUtil";

function LoginForm() {
  // 사용하는 함수들 임포트
  const { determineRole, reqLogIn } = useLogIn();
  // 사용하는 변수들 임포트
  const {
    signUpLink,
    anotherLoginLink,
    anotherLogintxt,
    loginTitle,
    isLoginAdmin,
  } = LoginFormVar();

  // 인풋 필드 useState
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  // 인풋 필드 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // url에 따른 role 값 사전 설정
  const role = determineRole();
  useEffect(() => {
    // role 값을 설정해줍니다.
    setFormData((prevData) => ({
      ...prevData,
      role: role,
    }));
  }, [role]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void reqLogIn(formData);
    }
  };
  function handlereqLogIn() {
    void reqLogIn(formData);
  }

  return (
    <>
      <div className="formContainer">
        <p className="loginTitle">{loginTitle}</p>
        <div className="box">
          <label>아이디</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter ID"
            className="input-box"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          <br />
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
            onKeyPress={handleKeyPress}
            required
          />
          <br />
          {/* <div className="forget">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkbox-custom "></span>
              <span className="label-text">Remember me</span>
            </label>
            <span className="fg">
              <a href="#"> Forget password?</a>
            </span>
          </div> */}
          <div className="errorMsg">{}</div>
          <div className="btnBox">
            {!isLoginAdmin ? (
              <>
                <Link to={signUpLink} className="btn smallbutton">
                  <p>회원가입</p>
                </Link>
                <button
                  type="submit"
                  className="btn smallbutton"
                  onClick={handlereqLogIn}
                >
                  <p>로그인</p>
                </button>
              </>
            ) : (
              <button type="submit" className="btn" onClick={handlereqLogIn}>
                <p>로그인</p>
              </button>
            )}
          </div>
        </div>
        {!isLoginAdmin && (
          <Link
            to={anotherLoginLink}
            style={{
              margin: "0px",
              marginBottom: "100px",
              textDecorationLine: "underline",
              fontSize: "13px",
            }}
            className="anotherLogin"
          >
            <p>
              {">"} {anotherLogintxt}
            </p>
          </Link>
        )}
      </div>
    </>
  );
}
export default LoginForm;
