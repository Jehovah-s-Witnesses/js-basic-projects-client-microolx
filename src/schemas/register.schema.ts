import { type Static, Type } from '@sinclair/typebox';

export const registerSchema = Type.Object({
  email: Type.String({
    minLength: 6,
    maxLength: 40,
    format: 'email',
  }),
  username: Type.String({ minLength: 4, maxLength: 30 }),
  password: Type.String({ minLength: 8, maxLength: 30 }),
});

export type RegisterPayload = Static<typeof registerSchema>;
