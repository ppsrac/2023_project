import SignUp from "../../commponents/Entrance/Form/SignUpForm";
import MainLogo from "../../commponents/Base/MainLogo";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function SignupGallery() {
  return (
    <>
      <div style={{ height: "10vh" }}></div>
      <MainLogo />
      <SignUp />
      <MarginTopInput value={50} />
    </>
  );
}
export default SignupGallery;
