import axios, { AxiosResponse } from "axios";
import { createUrl } from "../commponents/Base/BaseFun";
// 아래의 API들은 로그인 요청&반환 값에 대한 타입지정, Api함수 로직으로 구성되어있습니다.

// // 디폴트 백엔드 URL
// const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;

// // URL을 디폴트 백엔드 URL과 합치는 함수
// const createUrl = (endpoint: string): string => {
//   return `${defaultBackendUrl}${endpoint}`;
// };

// 로그인 API
export interface LogInRes {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface LogInReq {
  username: string;
  password: string;
  role: string;
}

export const logInApi = async (dataToSend: LogInReq): Promise<LogInRes> => {
  try {
    const response: AxiosResponse<LogInRes> = await axios.post(
      createUrl("/auth/login"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching LoginApi:", error);
    throw error;
  }
};

// 로그아웃 API
export interface LogOutRes {
  Sample: string;
}

export interface LogoutReq {
  Sample: string;
}

export const logOutApi = async (dataToSend: LogoutReq): Promise<LogOutRes> => {
  try {
    const response: AxiosResponse<LogOutRes> = await axios.post(
      createUrl("/auth/logout"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching LogoutApi:", error);
    throw error;
  }
};

// 토큰 갱신
export interface RefreshRes {
  Sample: string;
  // 필요한 정보 타입 명시
}

export interface RefreshReq {
  Sample: string;
  // 필요한 정보 타입 명시
}

export const refreshToken = async (
  dataToSend: RefreshReq
): Promise<RefreshRes> => {
  try {
    const response: AxiosResponse<RefreshRes> = await axios.post(
      createUrl("/auth/refresh"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching RefresApi:", error);
    throw error;
  }
};

// 회원가입 (유저) API
export interface SignUpUserRes {
  message: string;
  data: {
    user: {
      username: string;
      nickname: string;
      phoneNumber: number;
    };
  };
}

export interface SignUpReq {
  username: string;
  password: string;
  phoneNumber: number;
  nickname?: string;
  galleryName?: string;
}

export const signUpUserApi = async (
  dataToSend: SignUpReq
): Promise<SignUpUserRes> => {
  try {
    const response: AxiosResponse<SignUpUserRes> = await axios.post(
      createUrl("/auth/signup"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SignUpApi:", error);
    throw error;
  }
};

// 회원가입 (갤러리) API
export interface SignUpGalleryRes {
  message: string;
  data: {
    user: {
      username: string;
      galleryName: string;
      description: string;
    };
  };
}

export const signUpGalleryApi = async (
  dataToSend: SignUpReq
): Promise<SignUpGalleryRes> => {
  try {
    const response: AxiosResponse<SignUpGalleryRes> = await axios.post(
      createUrl("/auth/signup/galleries"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SignUpApi:", error);
    throw error;
  }
};

// 회원탈퇴 API
export interface WithdrawalRes {
  Sample: string;
}

export interface WithdrawalReq {
  Sample: string;
}

export const withdrawalApi = async (): Promise<WithdrawalRes> => {
  try {
    const response: AxiosResponse<WithdrawalRes> = await axios.delete(
      createUrl("/api/Withdrawal")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching WithdrawalApi:", error);
    throw error;
  }
};
