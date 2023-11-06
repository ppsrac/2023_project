// 인터셉터를 통해 리프레시 토큰 검증하는 파일입니다.

import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL, // 디폴트 백엔드 URL
});

// 리프레시한 엑세스 토큰을 헤더에 싣는 작업
const setAuthorizationHeader = (token: string): void => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
// 저장된 리프레시 토큰을 가져오는 함수
const getRefreshTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("refresh_token");
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;

    // 액세스 토큰 만료 시에만 리프레시 토큰 사용
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.response?.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshTokenFromLocalStorage();

        const response: AxiosResponse<{ accessToken: string }> =
          await axiosInstance.post("/auth/refresh", {
            refreshToken,
          }); // 만료 토큰 갱신

        const newAccessToken = response.data.accessToken;
        setAuthorizationHeader(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 로컬스토리지에 재발급한 토큰 저장
        localStorage.setItem("access_token", newAccessToken);

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
