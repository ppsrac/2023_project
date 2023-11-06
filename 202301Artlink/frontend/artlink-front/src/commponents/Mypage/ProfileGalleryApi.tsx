import React, { useEffect } from "react";
import { GalleryInfoRes, GalleryInfo } from "../../api/GalleryApi";
import axios from "axios";

interface ApitestGalleryInfoProps {
  onGalleryDataChange: (data: GalleryInfoRes) => void;
}

const ApiGalleryInfo: React.FC<ApitestGalleryInfoProps> = ({
  onGalleryDataChange,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          accessToken as string
        }`;

        const data = await GalleryInfo();

        // 부모 컴포넌트로 데이터 전달
        onGalleryDataChange(data);
      } catch (error) {
        console.error("Error fetching Gallery info data:", error);
      }
    };

    void fetchData();
  }, []);

  return <></>;
};

export default ApiGalleryInfo;
