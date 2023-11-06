import axios, { AxiosResponse } from "axios";

export interface Sample {
  date: Date;
  name: string;
  rate: number;
  timestamp: number;
  // 필요한 정보 타입 명시
}
export const fetchSample = async (): Promise<Sample[]> => {
  try {
    const response: AxiosResponse<Sample[]> = await axios.get(
      "https://api.manana.kr/exchange/rate/KRW/JPY,USD,KRW.json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Sample:", error);
    throw error;
  }
};

export interface Sample {
  Sample: string;
  // 필요한 정보 타입 명시
}
export const fetchSample2 = async (): Promise<Sample[]> => {
  try {
    const response: AxiosResponse<Sample[]> = await axios.post("/api/Sample");
    return response.data;
  } catch (error) {
    console.error("Error fetching Sample:", error);
    throw error;
  }
};
