import { AxiosError } from "axios";
import { ApiError } from "./apis.types";
import { ApiClient } from "./axios";
import {ApiMode} from "@/enums/common"

const axiosConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers:{}
}

const bizConfig = {
    mode : import.meta.env.MODE as ApiMode,
    onError: (error: AxiosError<ApiError>) => {
        console.error(error);
        // const errorStore = useErrorStore();
        // errorStore.setError(error.response?.data?.code, error.response?.data?.message);
      },
}

export const api = new ApiClient(axiosConfig, bizConfig);