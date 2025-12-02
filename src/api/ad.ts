import type { Ad } from '../schemas/ad.schema.ts';
import { httpClient } from './httpClient.ts';
import type { AdEntity, AdsGetPayload } from '../types/dto/ad.ts';
import { DEFAULT_LIMIT } from '../view/components/Constants/constants.ts';

export const createNewAd = (body: Ad) => {
  return httpClient.post<
    {
      message: string;
    } & AdEntity
  >('/ad', body);
};

export const getOwnAds = ({
  limit = DEFAULT_LIMIT,
  offset = 0,
}: AdsGetPayload) => {
  return httpClient.get<{ count: number; items: AdEntity[] }>('/ownAds', {
    params: { limit, offset },
  });
};

export const publishAd = (adId: string, body: Ad) => {
  return httpClient.put<AdEntity>(`/ad/${adId}`, body);
};

export const getPublicAds = ({
  limit = DEFAULT_LIMIT,
  offset = 0,
}: AdsGetPayload) => {
  return httpClient.get<{ count: number; items: AdEntity[] }>('/publicAds', {
    params: { limit, offset },
  });
};
