import { TokenStorage } from '../service/tokenStorage.ts';

export const accessTokenStorage = new TokenStorage('access');
export const refreshTokenStorage = new TokenStorage('refresh');
