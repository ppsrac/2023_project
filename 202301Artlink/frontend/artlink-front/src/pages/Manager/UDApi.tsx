import React, { useEffect } from "react";
import { OneUserEach, OneUserGet } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";

interface UserInfoManageProps {
  onUserDataChange: (data: OneUserEach) => void;
}

const UserInfoManage: React.FC<UserInfoManageProps> = ({
  onUserDataChange,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthorizationHeader(); // set authorization
        // 매니저 : api호출
        const data = await OneUserGet();
        console.log(data);

        // 부모 컴포넌트로 데이터 전달
        onUserDataChange(data);
      } catch (error) {
        console.error("Error fetching UserInfo Manager data:", error);
      }
    };

    void fetchData();
  }, []);

  return <></>;
};

export default UserInfoManage;
