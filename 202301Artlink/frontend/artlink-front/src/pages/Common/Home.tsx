import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./Home.css";

import HomeUser from "../../commponents/HomeWho/HomeUser";
import HomeGallery from "../../commponents/HomeWho/HomeGallery";
import HomeManager from "../../commponents/HomeWho/HomeManager";

interface DecodedToken {
  sub: string;
  role: string;
  id: number;
  exp: number;
  username: string;
}

function Homepage() {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("access_token");

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 isLoggedIn 상태를 체크하고, 로그인 상태가 아니라면 내비게이션을 수행합니다.

    if (!accessToken) {
      navigate("/");
      // setUserRole("ROLE_ADMIN"); // 사용자 역할을 상태에 저장
    } else {
      // 엑세스 토큰을 디코딩하여 사용자 역할을 추출합니다.
      const decodedToken = jwt_decode<DecodedToken>(accessToken);
      const userRole = decodedToken.role; // 디코딩된 토큰에서 'role' 값을 추출
      setUserRole(userRole); // 사용자 역할을 상태에 저장
    }
  }, [navigate]);

  let render_component;
  if (userRole === "ROLE_ADMIN") {
    render_component = <HomeManager />;
  } else if (userRole === "ROLE_USER") {
    render_component = <HomeUser />;
  } else if (userRole === "ROLE_GALLERY") {
    render_component = <HomeGallery />;
  }

  return (
    <>
      {/* <div style={{ paddingTop: "10vh" }}></div> */}
      <div style={{ marginTop: "10vh" }}></div>
      <div className="HomeInnerFrame">{render_component}</div>
    </>
  );
}

export default Homepage;
