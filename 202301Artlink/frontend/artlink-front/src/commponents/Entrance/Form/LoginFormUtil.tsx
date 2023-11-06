// LoginFormUtils.ts

export function LoginFormVar(): {
  signUpLink: string;
  anotherLoginLink: string;
  anotherLogintxt: string;
  loginTitle: string;
  isLoginAdmin: boolean;
} {
  const signUpLink = location.pathname.includes("login-gallery")
    ? "/signup-gallery"
    : "/signup";
  const anotherLoginLink = location.pathname.includes("login-gallery")
    ? "/login"
    : "/login-gallery";
  const anotherLogintxt = location.pathname.includes("login-gallery")
    ? "사용자 로그인으로 가기"
    : "갤러리 로그인으로 가기";
  const loginTitle = location.pathname.includes("login-admin")
    ? "관리자 로그인"
    : location.pathname.includes("login-gallery")
    ? "갤러리 로그인"
    : "로그인";

  const isLoginAdmin = location.pathname.includes("login-admin");

  return {
    signUpLink,
    anotherLoginLink,
    anotherLogintxt,
    loginTitle,
    isLoginAdmin,
  };
}
