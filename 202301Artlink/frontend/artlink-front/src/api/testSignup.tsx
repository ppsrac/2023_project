import React, { useEffect, useState } from "react";
import { signUpUserApi, SignUpUserRes, SignUpReq } from "./CommonApi";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.

const Apitest: React.FC = () => {
  const [sampleData, setSampleData] = useState<SignUpUserRes>({
    message: "",
    data: {
      user: {
        username: "",
        nickname: "",
        phoneNumber: 0,
      },
    },
  });
  const sendData: SignUpReq = {
    username: "userrr",
    password: "1234",
    phoneNumber: 821022921491,
    nickname: "",
  };

  const getData = async () => {
    try {
      const data = await signUpUserApi(sendData);
      console.log(data);
      setSampleData(data);
    } catch (error) {
      console.error("Error fetching signUpApi data:", error);
    }
  };
  useEffect(() => {
    console.log("이펙 트");
    void getData(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <>
      <h1>Apitest</h1>
      <p>회원가입 API 테스트입니다.</p>
      <hr />
      <div>
        {/* 가져온 데이터를 화면에 렌더링 */}
        <p>{sampleData.message}</p>
        <p>{sampleData.data.user.username}</p>
        <p>{sampleData.data.user.nickname}</p>
        <p>{sampleData.data.user.phoneNumber}</p>
      </div>
    </>
  );
};
export default Apitest;
