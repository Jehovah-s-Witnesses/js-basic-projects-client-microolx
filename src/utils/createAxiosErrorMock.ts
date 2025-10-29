import { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export function createAxiosErrorMock<T>(data: T) {
  return new AxiosError<T>(undefined, undefined, undefined, undefined, {
    config: {} as InternalAxiosRequestConfig,
    headers: {},
    request: undefined,
    status: 400,
    statusText: '',
    data,
  });
}
