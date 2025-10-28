import type { AdPayload } from '../schemas/ad.schema.ts';
import { httpClient } from './httpClient.ts';

export const createAd = (body: AdPayload) => {
  return httpClient.post<{
    message: string;
    accessToken: string;
    refreshToken: string;
  }>('/ad', body);
};
