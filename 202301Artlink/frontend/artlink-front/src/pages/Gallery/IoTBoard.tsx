import styles from "./IoTBoard.module.css";
import { useState, useEffect } from "react";
import { Data, getDeviceList } from "../../api/IoTApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoBoard from "../../commponents/Info/InfoBoard";

function IoTBoard() {
  const [deviceData, setDeviceData] = useState<Data[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setAuthorizationHeader();
        const response: Data[] = await getDeviceList();
        setDeviceData(response);
      } catch (error) {
        console.error("기기 정보들을 가져오는 데 실패했습니다.", error);
        window.alert("기기 정보 가져오기 실패");
      }
    };
    void getData();
  }, []);

  const keys = ["Id", "Phone number"];
  const widths = ["20%", "80%"];

  return (
    <>
      <div className={styles.container}>
          <InfoBoard
            title="IoT Manager"
            data={deviceData}
            addLink={"/gallery/add-iot"}
            dataKeys={keys}
            columnWidths={widths}
            detail={false}
          />
      </div>
    </>
  );
}
export default IoTBoard;
