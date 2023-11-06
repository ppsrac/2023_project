import Styles from "./Btn.module.css";

interface TextBtnProps {
  inner: string;
  wid: string|number;
  hei: string|number;
  fontSize : number;
}
const TextBtn: React.FC<TextBtnProps> = ({ inner, wid, hei, fontSize }) => {
  const buttonStyle = {
    width: `${wid}`,
    height: `${hei}`,
    fontSize: `${fontSize}px`,
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
