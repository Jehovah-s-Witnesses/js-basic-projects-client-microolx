import { type Static, Type } from '@sinclair/typebox';

enum Currency {
  usd = 'usd',
  uah = 'uah',
}

enum Status {
  draft = 'draft',
  public = 'public',
  archived = 'archived',
}

export const adSchema = Type.Object({
  title: Type.String({ minLength: 6, maxLength: 40 }),
  description: Type.String({ minLength: 10, maxLength: 1000 }),
  price: Type.Number({ minimum: 1 }),
  currency: Type.Enum(Currency),
  location: Type.String({ minLength: 4, maxLength: 40 }),
  status: Type.Enum(Status),
});

export type AdPayload = Static<typeof adSchema>;
