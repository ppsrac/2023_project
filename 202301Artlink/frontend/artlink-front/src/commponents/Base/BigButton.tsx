// import React from 'react'
import Styles from "./BigButton.module.css";

interface Props {
  tabName: string;
  mini: string;
}

const BigButton: React.FC<Props> = ({ tabName, mini }) => {
  return (
    <>
      <div className={Styles.BigBtn}>
        <h1>{tabName}</h1>
        {mini}
      </div>
    </>
  );
};

export default BigButton;
