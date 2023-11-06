import Styles from "./Btn.module.css";

interface TextBtnProps {
  inner: string;
  wid: number;
  hei: number;
}
const TextBtn: React.FC<TextBtnProps> = ({ inner, wid, hei }) => {
  const buttonStyle = {
    width: `${wid}px`,
    height: `${hei}px`,
  };
  return (
    <>
    <div className={Styles.textbuttonOutter} style={buttonStyle}>
      <button className={Styles.textbutton} style={buttonStyle}>
        {inner}
      </button>
    </div>
    </>
  );
};
export default TextBtn;
