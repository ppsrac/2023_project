import SignUpForm from "../../commponents/Entrance/Form/SignUpForm";
import MainLogo from "../../commponents/Base/MainLogo";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function Signup() {
  return (
    <>
      <div style={{ height: "10vh" }}></div>
      <MainLogo />
      <SignUpForm />
      <MarginTopInput value={50} />
    </>
  );
}
export default Signup;
