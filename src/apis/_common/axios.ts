/**
 * API 요청 시 필요한 헤더 정보
 *
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from './apis.types.ts';

// Axios 설정 인터페이스
export interface AxiosConfig extends AxiosRequestConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

// JWT 설정 인터페이스
export interface BizConfig {
  mode: 'development' | 'test' | 'production' | 'library';
  onError?: (error: AxiosError<ApiError>) => void;
}

// 기본 비즈니스 설정
const defaultBizConfig: BizConfig = {
  mode: 'development',
  onError: (error: AxiosError<ApiError>) => {
    console.error('Axios 에러:', error);
  },
};

// API 클래스 정의
export class ApiClient {
  private instance: AxiosInstance;
  private bizConfig: BizConfig = defaultBizConfig;

  constructor(config: AxiosConfig, bizConfig?: BizConfig) {
    this.instance = this.createInstance(config, bizConfig);
  }

  private createInstance(config: AxiosConfig, bizConfig?: BizConfig): AxiosInstance {
    this.bizConfig = {
      ...defaultBizConfig,
      ...bizConfig,
    };

    const axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...config.headers,
      },
    });

    // 요청 인터셉터
    axiosInstance.interceptors.request.use(
      config => {
        // if (config.url?.includes("/oqf/public/")) {
        //   // 비로그인 API 호출
        //   const atAuthInfo = this.bizConfig.getATAuthInfo();

        //   config.headers["access-token"] = atAuthInfo["access-token"] ?? "";
        //   config.headers["nonce"] = atAuthInfo["nonce"] ?? "";
        //   config.headers["uuid"] = atAuthInfo["uuid"] ?? "";
        // } else if (config.url?.includes("/oqf/api/")) {
        //   // 로그인 API 호출
        //   const oatAuthInfo = this.bizConfig.getOATAuthInfo();

        //   config.headers["one-access-token"] = oatAuthInfo["one-access-token"] ?? "";
        //   config.headers["nonce"] = oatAuthInfo["nonce"] ?? "";
        //   config.headers["uuid"] = oatAuthInfo["uuid"] ?? "";
        // } else {
        //   // @todo 임시 테스트용. 삭제 예정
        //   const atAuthInfo = this.bizConfig.getATAuthInfo();

        //   config.headers["access-token"] = atAuthInfo["access-token"] ?? "";
        //   config.headers["nonce"] = atAuthInfo["nonce"] ?? "";
        //   config.headers["uuid"] = atAuthInfo["uuid"] ?? "";
        // }

        return config;
      },
      error => Promise.reject(error)
    );

    // 응답 인터셉터
    axiosInstance.interceptors.response.use(
      response => {
        if (this.bizConfig.mode === 'development') {
          console.log('response', response);
        }

        return response;
      },
      async (error: AxiosError<ApiError>) => {
        // API 에러 변환
        const apiError: ApiError = {
          message: error.response?.data?.message || 'An error occurred',
          status: error.response?.status || 500,
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
        };

        this.bizConfig.onError?.(error);
        return Promise.reject(apiError);
      }
    );

    return axiosInstance;
  }

  // API 메서드들
  async getApi<P, R>(urlPath: string, params?: P): Promise<R> {
    const sysHeader = await this.getSysHeader();
    const response = await this.instance.get<R>(urlPath, {
      params,
      headers: sysHeader,
    });
    return response.data;
  }

  async postApi<D, R>(urlPath: string, body: D): Promise<R> {
    const sysHeader = await this.getSysHeader();
    const response = await this.instance.post<R>(urlPath, body, {
      headers: sysHeader,
    });
    return response.data;
  }

  async patchApi<D, R>(urlPath: string, data: D): Promise<R> {
    const sysHeader = await this.getSysHeader();
    const response = await this.instance.patch<R>(urlPath, data, {
      headers: sysHeader,
    });
    return response.data;
  }

  async deleteApi<D, R>(urlPath: string, data?: D): Promise<R> {
    const sysHeader = await this.getSysHeader();
    const response = await this.instance.delete<R>(urlPath, { data, headers: sysHeader });
    return response.data;
  }

  async getSysHeader() {
    // const defaultSysHeader = JSON.parse(
    //   base64_decode(this.instance.defaults.headers["hana-sys-header"] as string)
    // );

    // // @todo 요청마다 추가 설정할 정보가 있는가?
    // const sysHeader = {
    //   ...defaultSysHeader
    // };

    return {};
  }
}
