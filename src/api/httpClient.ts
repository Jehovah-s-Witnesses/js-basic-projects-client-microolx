import axios, { AxiosError } from 'axios';
import {
  accessTokenStorage,
  refreshTokenStorage,
} from '../initializers/token.ts';
import { refreshSession } from './user.ts';

export const httpClient = axios.create({
  baseURL: 'http://localhost:4043/api/v1',
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = accessTokenStorage.get();
    console.log(config);
    if (accessToken) {
      config.headers.authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401 &&
      error.config
    ) {
      const currentRefreshToken = refreshTokenStorage.get();

      if (currentRefreshToken) {
        const {
          data: { accessToken, refreshToken },
        } = await refreshSession({ refreshToken: currentRefreshToken });
        accessTokenStorage.set(accessToken);
        refreshTokenStorage.set(refreshToken);
        return httpClient(error.config);
      }
    }
    return Promise.reject(error);
  },
);
