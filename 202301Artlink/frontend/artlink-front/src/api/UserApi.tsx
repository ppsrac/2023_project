import axios, { AxiosResponse } from "axios";
import { setAuthorizationHeader } from "../commponents/Base/BaseFun";
import { createUrl } from "../commponents/Base/BaseFun";

// const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// // URL을 디폴트 백엔드 URL과 합치는 함수
// const createUrl = (endpoint: string): string => {
//   return `${defaultBackendUrl}${endpoint}`;
// };

// 유저정보 조회
export interface UserInfo {
  id: number;
  username: string;
  phoneNumber: number;
  [key: string]: string | number;
}
export const GetUserInfo = async (): Promise<UserInfo> => {
  try {
    const response: AxiosResponse<UserInfo> = await axios.get(
      createUrl("/users/me")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserInfo:", error);
    throw error;
  }
};

// 유저정보 변경
export interface UserInfoEditRes {
  username: string;
  nickname: string;
  phoneNumber: number;
}
export const UserInfoEdit = async (
  dataToSend: UserInfo
): Promise<UserInfoEditRes> => {
  try {
    const response: AxiosResponse<UserInfoEditRes> = await axios.put(
      createUrl("/users/me"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserInfoEdit:", error);
    throw error;
  }
};

// 유저 비밀번호 변경
export interface UserPasswordChangeRes {
  notdefined: boolean;
}
export interface UserPasswordChangeReq {
  password: number;
}
export const UserPasswordChange = async (
  dataToSend: UserPasswordChangeReq
): Promise<UserInfo[]> => {
  try {
    const response: AxiosResponse<UserInfo[]> = await axios.post(
      createUrl("/users/me/change-password"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserInfo:", error);
    throw error;
  }
};

// 유저 이미지 불러오기
export interface UserImageRes {
  profilePicture: string;
}
export const UserImage = async (): Promise<UserImageRes> => {
  try {
    const response: AxiosResponse<UserImageRes> = await axios.get(
      createUrl("/users/me/profile-picture")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserImage:", error);
    throw error;
  }
};

// 유저 이미지 변경
export interface UserImageChangeRes {
  notdefined: boolean;
}
export const UserImageChange = async (
  formData: FormData
): Promise<UserImageChangeRes> => {
  try {
    for (const [key, value] of formData) {
      console.log("Key:", key);
      console.log("Value:", value);
    }
    const response: AxiosResponse<UserImageChangeRes> = await axios.put(
      createUrl("/users/me/profile-picture"),
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching User Profile Image:", error);
    throw error;
  }
};

// 유저 전시 전체 조회
export interface Exhibition {
  [key: string]: string;
}
export interface UserRecordsRes {
  [key: string]: string | number;
  posterUrl: string;
  userKey: string;
}
export const UserRecords = async (): Promise<[UserRecordsRes]> => {
  setAuthorizationHeader();
  try {
    const response: AxiosResponse<[UserRecordsRes]> = await axios.get(
      createUrl("/users/me/userkeys")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserRecords:", error);
    throw error;
  }
};

// 유저 전시 상세 조회
export interface Paint {
  [key: string]: string;
}
export interface UserOneRecordRes {
  exhibitionID: number;
  exhibitionName: string;
  exhibitionDescription: string;
  exhibitionUrl: string;
  galleryID: number;
  galleryName: string;
  visitDate: string;
  workList: Paint[];
}
export const UserOneRecord = async (pk: string): Promise<UserOneRecordRes> => {
  try {
    setAuthorizationHeader();
    const response: AxiosResponse<UserOneRecordRes> = await axios.get(
      createUrl(`/postevents/${pk}`)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserOneRecord:", error);
    throw error;
  }
};
