import type { RegisterPayload } from '../schemas/register.schema.ts';
import { httpClient } from './httpClient.ts';
import type { LoginPayload } from '../schemas/login.schema.ts';

export const registerUser = (body: RegisterPayload) => {
  return httpClient.post('/register', body);
};

export const loginUser = (body: LoginPayload) => {
  return httpClient.post<{
    message: string;
    accessToken: string;
    refreshToken: string;
  }>('/login', body);
};
