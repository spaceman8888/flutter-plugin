// 기본 API 에러 타입
export interface ApiError {
  message: string;
  status: number;
  code: string;
}

// 응답 데이터 변환을 위한 타입
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
