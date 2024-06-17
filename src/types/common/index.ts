export interface APIResponseSuccess<T> {
  permissions?: any;
  success: true;
  data: T;
  message?: string;
  count?: number
}

export interface APIResponseFailure {
  success: false;
  message: string;
}
export interface APITaskResponseSuccess {
  success: boolean;
  message: string;
}

export type APIResponse<T> = APIResponseSuccess<T> |  APIResponseFailure;
