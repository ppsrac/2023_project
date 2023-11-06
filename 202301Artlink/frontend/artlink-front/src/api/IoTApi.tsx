import axios, { AxiosResponse } from "axios";
import { createUrl } from "../commponents/Base/BaseFun";

/*
기기 등록(POST): /devices/{deviceId}
기기 데이터 삭제(유저키 생성)(DELETE): /devices/{deviceI}
특정 갤러리 내의 현재 사용 중인 기기들 조회(GET):
galleries/devices
*/

// const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// // URL을 디폴트 백엔드 URL과 합치는 함수
// const createUrl = (endpoint: string): string => {
//   return `${defaultBackendUrl}${endpoint}`;
// };

export interface Data {
  [key: string]: string | number;
}

// 기기 등록(POST): /devices/{deviceId}
export const registerDevice = async (
  req: Data,
  deviceId: number
): Promise<Data> => {
  try {
    const response: AxiosResponse<Data> = await axios.post(
      createUrl(`/devices/${deviceId}`),
      req
    );
    return response.data;
  } catch (error) {
    console.error("기기 등록에 실패했습니다.", error);
    throw error;
  }
};

// 기기 데이터 삭제(유저키 생성)(DELETE): /devices/{deviceId}
export const deleteDevice = async (deviceId: number): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await axios.delete(
      createUrl(`/devices/${deviceId}`)
    );
    return response.data;
  } catch (error) {
    console.error("기기 데이터 삭제 및 유저키 생성에 실패했습니다.", error);
    throw error;
  }
};

// 특정 갤러리 내의 현재 사용 중인 기기들 조회(GET): /galleries/devices
export const getDeviceList = async (): Promise<Data[]> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      accessToken as string
    }`;

    const response: AxiosResponse<Data[]> = await axios.get(
      createUrl(`/galleries/devices`)
    );
    return response.data;
  } catch (error) {
    console.error("기기들의 정보를 가져오는 데 실패했습니다.", error);
    throw error;
  }
};
