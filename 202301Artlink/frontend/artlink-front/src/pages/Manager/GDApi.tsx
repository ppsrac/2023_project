import React, { useEffect } from "react";
import { OneGalleryEach, OneGalleryGet } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";

interface UserInfoManageProps {
  onGalleryDataChange: (data: OneGalleryEach) => void;
}

const GDApi: React.FC<UserInfoManageProps> = ({ onGalleryDataChange }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthorizationHeader(); // set authorization
        // 매니저 : api호출
        const data = await OneGalleryGet();
        console.log(data);

        // 부모 컴포넌트로 데이터 전달
        onGalleryDataChange(data);
      } catch (error) {
        console.error("Error fetching UserInfo Manager data:", error);
      }
    };

    void fetchData();
  }, []);

  return <></>;
};

export default GDApi;
