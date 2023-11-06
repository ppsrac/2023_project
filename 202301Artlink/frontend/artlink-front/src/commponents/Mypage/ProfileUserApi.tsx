import React, { useEffect } from "react";
import { UserInfo, GetUserInfo } from "../../api/UserApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";

interface ApitestUserInfoProps {
  onUserDataChange: (data: UserInfo) => void;
}

const ApitestUserInfo: React.FC<ApitestUserInfoProps> = ({
  onUserDataChange,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthorizationHeader(); // set authorization

        const data = await GetUserInfo();
        console.log(data);

        // 부모 컴포넌트로 데이터 전달
        onUserDataChange(data);
      } catch (error) {
        console.error("Error fetching sample data:", error);
      }
    };

    void fetchData();
  }, []);

  return <></>;
};

export default ApitestUserInfo;
