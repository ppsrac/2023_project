import Styles from "./Btn.module.css";
import { Link } from "react-router-dom";

interface AddBtnProps {
  linkTo: string; // The link destination URL
}
const AddBtn: React.FC<AddBtnProps> = ({ linkTo }) => {
  return (
    <>
      <Link to={linkTo}>
        <button className={Styles.addbutton}>+</button>
      </Link>
    </>
  );
};
export default AddBtn;
