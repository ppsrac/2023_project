import axios, { AxiosResponse } from "axios";
import {
  setAuthorizationHeader,
  getPk2,
  getPk3,
} from "../commponents/Base/BaseFun";
import { createUrl } from "../commponents/Base/BaseFun";

// // 디폴트 백엔드 URL
// const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// // URL을 디폴트 백엔드 URL과 합치는 함수
// const createUrl = (endpoint: string): string => {
//   return `${defaultBackendUrl}${endpoint}`;
// };

// 갤러리 정보 조회
export interface GalleryInfoRes {
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
  [key: string]: string | boolean;
}
export const GalleryInfo = async (): Promise<GalleryInfoRes> => {
  try {
    const response: AxiosResponse<GalleryInfoRes> = await axios.get(
      createUrl("/galleries/me")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GalleryInfo:", error);
    throw error;
  }
};

// 갤러리 정보 변경
export interface GalleryInfoEditRes {
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
}
export interface GalleryInfoEditReq {
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
}
export const GalleryInfoEdit = async (
  dataToSend: GalleryInfoEditReq
): Promise<GalleryInfoEditRes[]> => {
  try {
    const response: AxiosResponse<GalleryInfoEditRes[]> = await axios.put(
      createUrl("/galleries/me"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GalleryInfoEdit:", error);
    throw error;
  }
};

// 전시회 전체 조회
export interface ExhibitionAllInfoRes {
  exhibitions: ExhibitionEach[];
}
export interface ExhibitionEach {
  id: number;
  exhibitionName: string;
  exhibitionExplanation: string;
  posterUrl: string;
  createdAt: string;
}
export const ExhibitionAllInfo = async (): Promise<ExhibitionAllInfoRes> => {
  try {
    setAuthorizationHeader();
    const response: AxiosResponse<ExhibitionAllInfoRes> = await axios.get(
      createUrl("/galleries/me/exhibitions")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionAllInfo:", error);
    throw error;
  }
};

// 전시회 생성
export interface ExhibitionCreateRes {
  id: number;
  [key: string]: string | number;
}
export interface ExhibitionCreateReq {
  [key: string]: string;
}
export const ExhibitionCreate = async (
  dataToSend: ExhibitionCreateReq
): Promise<ExhibitionCreateRes> => {
  try {
    const response: AxiosResponse<ExhibitionCreateRes> = await axios.post(
      createUrl("/galleries/me/exhibitions"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionCreate:", error);
    throw error;
  }
};
// 전시회 수정
export const ExhibitionUpdate = async (
  dataToSend: ExhibitionCreateReq
): Promise<ExhibitionCreateRes> => {
  try {
    const pk = getPk2();
    const response: AxiosResponse<ExhibitionCreateRes> = await axios.put(
      createUrl(`/galleries/me/exhibitions/${pk}`),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionUpdate:", error);
    throw error;
  }
};
// 전시회 포스터 등록
export interface ExhibitionPosterAddRes {
  [key: string]: string;
}
export const ExhibitionPosterAdd = async (
  formData: FormData,
  exhibitionId: number
): Promise<ExhibitionPosterAddRes> => {
  try {
    setAuthorizationHeader();
    console.log("포스터 등록", exhibitionId);
    const response: AxiosResponse<ExhibitionPosterAddRes> = await axios.post(
      createUrl(`/galleries/me/exhibitions/${exhibitionId}/posters`),
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionPosterAdd:", error);
    throw error;
  }
};
// 전시회 포스터 수정
export const ExhibitionPosterUpdate = async (
  formData: FormData
): Promise<ExhibitionPosterAddRes> => {
  try {
    setAuthorizationHeader();
    const pk = getPk2();
    const response: AxiosResponse<ExhibitionPosterAddRes> = await axios.post(
      createUrl(`/galleries/me/exhibitions/${pk}/posters`),
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionPosterUpdate:", error);
    throw error;
  }
};

// 전시회 상세 조회
export interface ExhibitionOneInfoRes {
  id: number;
  exhibitionName: string;
  exhibitionExplanation: string;
  posterUrl: string;
  createdAt: string;
  [key: string]: string | number;
}
export const ExhibitionOneInfo = async (): Promise<ExhibitionOneInfoRes> => {
  try {
    setAuthorizationHeader();
    const pk = getPk2();
    const response: AxiosResponse<ExhibitionOneInfoRes> = await axios.get(
      createUrl(`/galleries/me/exhibitions/${pk}`)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionOneInfo:", error);
    throw error;
  }
};

// 전시회 작품 생성
export interface WorkCreateRes {
  name: string;
  artist: string;
  locationX: number;
  locationY: number;
  description: string;
  drawingPath: string;
}
export interface WorkCreateReq {
  name: string;
  artist: string;
  locationX: number;
  locationY: number;
  description: string;
  imageFile: File;
}
export const WorkCreate = async (
  formData: FormData
): Promise<WorkCreateRes> => {
  try {
    setAuthorizationHeader();
    const pk = getPk2();
    const response: AxiosResponse<WorkCreateRes> = await axios.post(
      createUrl(`/galleries/me/exhibitions/${pk}/artworks`),
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching WorkCreate:", error);
    throw error;
  }
};

// 전시회 작품 전체 조회
export interface AllWorksRes {
  DrawingList: Drawing[];
}
export interface Drawing {
  name: string;
  id: number;
  drawingPath: string;
  description: string;
  artist: string;
  locationX: number;
  locationY: number;
  [key: string]: string | number;
}
export const AllWorks = async (): Promise<AllWorksRes> => {
  try {
    setAuthorizationHeader();
    const params = new URLSearchParams(location.search);
    const pk = params.get("pk");
    const response: AxiosResponse<AllWorksRes> = await axios.get(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      createUrl(`/galleries/me/exhibitions/${pk}/artworks`)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionAllInfo:", error);
    throw error;
  }
};

// 전시회 작품 개별 조회
export const OneWork = async (): Promise<Drawing> => {
  try {
    setAuthorizationHeader();
    const allpk = getPk3();
    const exhiPK = allpk[1];
    const workPK = allpk[0];
    const response: AxiosResponse<Drawing> = await axios.get(
      createUrl(`/galleries/me/exhibitions/${exhiPK}/artworks/${workPK}`)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching OneWorkInfo:", error);
    throw error;
  }
};

// 전시회 작품 업데이트
export interface WorkUpdateRes {
  name: string;
  artist: string;
  locationX: number;
  locationY: number;
  description: string;
  drawingPath: string;
}
export interface WorkUpdateReq {
  name: string;
  artist: string;
  locationX: number;
  locationY: number;
  description: string;
  imageFile: File;
}
export const WorkUpdate = async (
  formData: FormData
): Promise<WorkUpdateRes> => {
  try {
    setAuthorizationHeader();
    const allpk = getPk3();
    const exhiPK = allpk[1];
    const workPK = allpk[0];
    const response: AxiosResponse<WorkUpdateRes> = await axios.put(
      createUrl(`/galleries/me/exhibitions/${exhiPK}/artworks/${workPK}`),
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching WorkUpdate:", error);
    throw error;
  }
};
