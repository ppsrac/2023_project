import axios, { AxiosResponse } from "axios";
import { createUrl } from "../commponents/Base/BaseFun";

/*
사후 데이터 삭제(DELETE): selections/devices/{deviceId}
키를 통한 사후 데이터 조회(GET): /postevents/{Key}
*/

/*
태깅
-> RFID 기기에서 /devices/{deviceId}(DELETE) api로 userKey 받아옴
-> 기기에서 받아온 userKey를 키오스크 홈의 input에 넣기
-> 입력 후 제출 버튼 누를 시 해당 키가 다음 페이지로 넘겨지며 해당 페이지로 넘어감
*/

// const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// // URL을 디폴트 백엔드 URL과 합치는 함수
// const createUrl = (endpoint: string): string => {
//   return `${defaultBackendUrl}${endpoint}`;
// };

export interface Paint {
  artworkId: number;
  paintName: string;
  paintPath: string;
}

export interface PostData {
  exhibitionID: number;
  exhibitionName: string;
  galleryID: number;
  galleryName: string;
  visitDate: string;
  workList: Paint[];
}

// 사후 데이터 삭제(DELETE): /postevents/{userKey}/drawings/{deviceId}
export const deleteArtwork = async (
  userKey: string,
  drawingId: number
): Promise<void> => {
  try {
    const response: AxiosResponse<string> = await axios.delete(
      createUrl(`/postevents/${userKey}/drawings/${drawingId}`)
    );
    console.log(response.data);
  } catch (error) {
    console.error("사후 데이터 삭제에 실패했습니다.", error);
    throw error;
  }
};

// 키를 통한 사후 데이터 조회(GET): /postevents/{userKey}
export const getPostevents = async (userKey: string): Promise<PostData> => {
  try {
    const response: AxiosResponse<PostData> = await axios.get(
      createUrl(`/postevents/${userKey}`)
    );
    return response.data;
  } catch (error) {
    console.error("사후 데이터 정보를 가져오는 데 실패했습니다.", error);
    throw error;
  }
};

// 모의 프린트 요청(GET)
export const fakePrint = async (): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await axios.get(
      `https://i9a202.p.ssafy.io/bridge/test/`
    );
    return response.data;
  } catch (error) {
    console.error("프린트 실패했습니다.", error);
    throw error;
  }
};
