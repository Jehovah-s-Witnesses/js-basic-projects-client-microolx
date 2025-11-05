import { Currency, type Status } from '../../schemas/ad.schema.ts';

export type AdsGetPayload = {
  limit: number;
  offset: number;
  status?: Status;
  titleQuery?: string;
};

export type AdEntity = {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  location: string;
  status: Status;
};
