import React, { useEffect, useState } from "react";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.

const Apitest: React.FC = () => {
  // 토큰 확인용
  // 아래 영역 절대 지우지 말것
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [refreshToken, setRefreshToken] = useState<string | null>("");

  const getData = () => {
    try {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");
      setAccessToken(access);
      setRefreshToken(refresh);
    } catch (error) {
      console.error("토큰값을 가져오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    void getData();
  }, []);
  // 위 영역 절대 지우지 말것

  return (
    <>
      <h1>Apitest</h1>
      <hr />
      <div>
        {/* 아래 두 줄 절대 지우지 말것 */}
        <p>accessToken: {accessToken}</p>
        <p>refreshToken: {refreshToken}</p>
      </div>
    </>
  );
};
export default Apitest;
