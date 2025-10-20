import { type Static, Type } from '@sinclair/typebox';

// enum Currency {
//   usd = 'usd',
//   uah = 'uah',
//   eur = 'eur',
// }
export const loginSchema = Type.Object({
  username: Type.String({ minLength: 4, maxLength: 30 }),
  password: Type.String({ minLength: 8, maxLength: 30 }),
});

export type LoginPayload = Static<typeof loginSchema>;
