import styles from "./IoTAdd.module.css";
import { useState } from "react";
import { registerDevice } from "../../api/IoTApi";
import BackBtn from "../../commponents/Base/BackBtn";
import TextBtnFontsize from "../../commponents/Base/TextBtnFontsize";

interface Data {
  [key: string]: number;
}

function IoTAdd() {
  const [deviceData, setDeviceData] = useState<Data>({});

  // 인풋 필드값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setDeviceData((prevData) => ({
        ...prevData,
        [name]: Number("82" + value),
      }));
    } else {
      setDeviceData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handlerRegister();
    }
  };

  const handlerRegister = async () => {
    const { deviceId, ...restData } = deviceData;
    await registerDevice(restData, deviceId);
    window.location.reload();
  };

  return (
    <>
      <div className={styles.IoTBox}>
        <div className="worksBackBtn">
          <BackBtn />
          <div className="workTitle">Iot 등록</div>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.infoInputOuter}>
            <input
              type="text"
              name="deviceId"
              className={styles.infoInput}
              placeholder="Device ID"
              onChange={handleChange}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className={styles.infoInputOuter}>
            <input
              type="text"
              name="phoneNumber"
              className={styles.infoInput}
              placeholder="Phone number"
              onChange={handleChange}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className={styles.infoInputOuter}>
            <input
              type="text"
              name="exhibitionId"
              className={styles.infoInput}
              placeholder="Exhibition ID"
              onChange={handleChange}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <div onClick={handlerRegister}>
              <TextBtnFontsize
                fontSize={15}
                hei={"40px"}
                wid={"200px"}
                inner="기기 등록하기"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IoTAdd;
