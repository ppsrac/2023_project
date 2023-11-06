import ContactInfo from "../../commponents/Contact/ContactInfo";
import Styles from "./Contact.module.css";

// import React from 'react';
function Contact() {
  return (
    <>
      <div className={Styles.container}>
        <ContactInfo />
      </div>
    </>
  );
}
export default Contact;
