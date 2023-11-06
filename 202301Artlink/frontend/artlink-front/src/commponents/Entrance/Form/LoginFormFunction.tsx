import { useLocation } from "react-router-dom";
import { logInApi, LogInRes, LogInReq } from "../../../api/CommonApi";

export function useLogIn() {
  const location = useLocation();

  const determineRole = () => {
    if (location.pathname.includes("login-gallery")) {
      return "GALLERY";
    } else if (location.pathname.includes("login-admin")) {
      return "ADMIN";
    } else {
      return "USER";
    }
  };

  const reqLogIn = async (formData: LogInReq) => {
    try {
      const response: LogInRes = await logInApi(formData);
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      window.location.reload();
    } catch (error) {
      console.error("Error Log in:", error);
      window.alert("아이디 비밀번호를 확인하세요");
    }
  };

  return { determineRole, reqLogIn };
}
